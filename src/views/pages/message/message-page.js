import PropTypes from 'prop-types'
import React from 'react'
import {
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	Text,
	View
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import { isSameDay } from '../../../common/utils'
import MessageAvatar from '../../../components/MessageAvatar/MessageAvatar'
import MessageItem from '../../../components/MessageItem/MessageItem'
import NewMessage from '../../../components/NewMessage/NewMessage'
import VideoRecordModal from '../../../components/VideoRecordModal'
import { BID_STATUS, MESSAGE_TYPE } from '../../../enums'
import {
	fetchMessages,
	resendMessage,
	sendBubble,
	sendMessage,
	updateMessages
} from './scenario-actions'

class MessagePage extends React.Component {
	state = {
		showingVideoRecordingModal: false
	}

	componentDidMount() {
		this.askForMessages()
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this.scrollToBottom
		)
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.scrollToBottom
		)
	}

	scrollToBottom = () => {
		this.scrollView.scrollToEnd({ animated: true })
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove()
		this.keyboardDidHideListener.remove()
	}

	askForMessages() {
		const { navigation } = this.props
		const targetHid = navigation.getParam('targetHid', '0')
		const conversation = navigation.getParam('conversation', {})

		navigation.setParams({ title: conversation.partnerName })
		this.props.fetchMessages(targetHid, conversation)
	}

	handleSend = message => {
		this.props.sendMessage(
			this.props.navigation.getParam('conversation', {}),
			message
		)
	}

	handleResend = message => {
		this.props.resendMessage(
			this.props.navigation.getParam('conversation', {}),
			message
		)
	}

	renderMessage = item => {
		return (
			<MessageItem
				message={item}
				onClick={() => {}}
				onResend={this.handleResend}
			/>
		)
	}

	handleNewVideoRecorder = uri => {
		this.hideRecordingModal()
		this.props.sendBubble(
			this.props.navigation.getParam('conversation', {}),
			uri
		)
	}

	showRecordingModal = () => {
		this.setState({ showingVideoRecordingModal: true })
	}

	hideRecordingModal = () => {
		this.setState({ showingVideoRecordingModal: false })
	}

	onViewableItemsChanged = ({ changed }) => {
		// this might suck performance wise -> better solution:
		// check which objects changed it's visiibility and update only those
		let anyVideoChangedVisibility = false
		const messagesWithUpdatedVisibility = this.props.messages.map(
			singleMessage => {
				// don't change visibility for text messages
				if (singleMessage.type === MESSAGE_TYPE.STANDARD) {
					return singleMessage
				}
				const changedMessage = changed.find(
					ch => ch.item.id === singleMessage.id
				)
				if (changedMessage) {
					anyVideoChangedVisibility = true
					return { ...singleMessage, visible: changedMessage.isViewable }
				} else {
					return singleMessage
				}
			}
		)
		// Call reducer only when neccesery to optmize number of rerenders
		if (anyVideoChangedVisibility) {
			this.props.changeMessagesVisibility(messagesWithUpdatedVisibility)
		}
	}

	render() {
		return (
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior="padding"
				enabled={Platform.OS === 'ios'}
			>
				{this.state.showingVideoRecordingModal && (
					<VideoRecordModal
						onClose={this.hideRecordingModal}
						onRecordingFinish={this.handleNewVideoRecorder}
					/>
				)}
				<FlatList
					keyExtractor={item => `message-item-index-${item.id}`}
					contentContainerStyle={styles.scrollViewContainer}
					ref={ref => (this.scrollView = ref)}
					data={[
						{ avatar: true },
						...this.props.messages.map((mes, index) =>
							processMessages(mes, index, this.props.messages)
						)
					]}
					initialNumToRender={20}
					onViewableItemsChanged={this.onViewableItemsChanged}
					renderItem={({ item, index }) =>
						index === 0 ? (
							<MessageAvatar
								conversation={this.props.navigation.getParam(
									'conversation',
									{}
								)}
							/>
						) : (
							this.renderMessage(item)
						)
					}
					refreshControl={
						<RefreshControl
							refreshing={this.props.isLoading}
							onRefresh={() => this.askForMessages()}
						/>
					}
				/>
				{!this.props.isLoading && (
					<View
						style={{
							flexGrow: 0,
							flexShrink: 1
						}}
					>
						{this.props.details &&
						this.props.details.bidStatus === BID_STATUS.BID_WON ? (
							<Text style={styles.waitingText}>
								{I18n.t('message_page.waiting_text')}
							</Text>
						) : (
							<NewMessage
								onSend={this.handleSend}
								onCameraOpen={this.showRecordingModal}
							/>
						)}
					</View>
				)}
			</KeyboardAvoidingView>
		)
	}
}

MessagePage.propTypes = {
	fetchMessages: PropTypes.func.isRequired,
	sendMessage: PropTypes.func.isRequired,
	resendMessage: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	messages: PropTypes.array.isRequired,
	error: PropTypes.string,
	details: PropTypes.object,
	sendBubble: PropTypes.func.isRequired,
	changeMessagesVisibility: PropTypes.func.isRequired
}

const styles = EStyleSheet.create({
	scrollViewContainer: {
		backgroundColor: 'white',
		flexGrow: 1,
		flexShrink: 0,
		padding: 8
	},
	waitingText: {
		padding: 16,
		backgroundColor: 'white',
		textAlign: 'center',
		fontSize: 20,
		color: '#4f4f4f'
	}
})

const mapStateToProps = state => {
	return {
		error: state.conversations.currentConversation.error,
		isLoading: state.conversations.currentConversation.isLoading,
		details: state.conversations.currentConversation.details,
		messages: state.conversations.currentConversation.messages
	}
}

const processMessages = (mes, index, messages) => {
	const previous = index - 1 >= 0 ? messages[index - 1] : null
	const next = messages[index + 1]
	return {
		...mes,
		showAvatar: !(next && next.senderHid === mes.senderHid),
		ownPrevious: previous && previous.senderHid === mes.senderHid,
		ownNext: next && next.senderHid === mes.senderHid,
		hasDivider:
			!previous || (previous && !isSameDay(previous.sentTime, mes.sentTime))
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchMessages: (hid, conversation) =>
			dispatch(fetchMessages(hid, conversation)),
		sendMessage: (conversation, text) =>
			dispatch(sendMessage(conversation, text)),
		resendMessage: (conversation, message) =>
			dispatch(resendMessage(conversation, message)),
		sendBubble: (conversation, uri) => dispatch(sendBubble(conversation, uri)),
		changeMessagesVisibility: newMessagesState =>
			dispatch(updateMessages(newMessagesState))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MessagePage)

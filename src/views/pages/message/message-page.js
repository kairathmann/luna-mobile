import PropTypes from 'prop-types'
import React from 'react'
import {
	FlatList,
	Keyboard,
	RefreshControl,
	Platform,
	Text,
	View,
	KeyboardAvoidingView
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import { isSameDay } from '../../../common/utils'
import MessageAvatar from '../../../components/MessageAvatar/MessageAvatar'
import MessageItem from '../../../components/MessageItem/MessageItem'
import NewMessage from '../../../components/NewMessage/NewMessage'
import { BID_STATUS } from '../../../enums'
import { fetchMessages, resendMessage, sendMessage } from './scenario-actions'

class MessagePage extends React.Component {
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

	render() {
		return (
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior="padding"
				enabled={Platform.OS === 'ios'}
			>
				<FlatList
					keyExtractor={item => `message-item-index-${item.id}`}
					contentContainerStyle={styles.scrollViewContainer}
					ref={ref => (this.scrollView = ref)}
					data={[{ avatar: true }, ...this.props.messages]}
					initialNumToRender={100}
					renderItem={({ item, index }) =>
						index === 0 ? (
							<MessageAvatar
								conversation={this.props.navigation.getParam(
									'conversation',
									{}
								)}
							/>
						) : (
							<MessageItem
								message={item}
								onClick={() => {}}
								onResend={this.handleResend}
							/>
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
							<NewMessage onSend={this.handleSend} />
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
	details: PropTypes.object
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
		messages: state.conversations.currentConversation.messages.map(
			(mes, index) =>
				processMessages(
					mes,
					index,
					state.conversations.currentConversation.messages
				)
		)
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
			dispatch(resendMessage(conversation, message))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MessagePage)

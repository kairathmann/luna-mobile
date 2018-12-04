import PropTypes from 'prop-types'
import React from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { isSameDay } from '../../../common/utils'
import MessageItem from '../../../components/MessageItem/MessageItem'
import NewMessage from '../../../components/NewMessage/NewMessage'
import { fetchMessages, resendMessage, sendMessage } from './scenario-actions'

class MessagePage extends React.Component {
	componentDidMount() {
		this.askForMessages()
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
			<View style={{ flex: 1 }}>
				<FlatList
					keyExtractor={item => `message-item-index-${item.id}`}
					contentContainerStyle={styles.scrollViewContainer}
					ref={ref => (this.scrollView = ref)}
					data={this.props.messages}
					initialNumToRender={100}
					renderItem={({ item }) => (
						<MessageItem
							message={item}
							onClick={() => {}}
							onResend={this.handleResend}
						/>
					)}
					onContentSizeChange={() => {
						this.scrollView.scrollToEnd({ animated: true })
					}}
					refreshControl={
						<RefreshControl
							refreshing={this.props.isLoading}
							onRefresh={() => this.askForMessages()}
						/>
					}
				/>
				<View
					style={{
						flexGrow: 0,
						flexShrink: 1
					}}
				>
					<NewMessage onSend={this.handleSend} />
				</View>
			</View>
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
	error: PropTypes.string
}

const styles = EStyleSheet.create({
	scrollViewContainer: {
		backgroundColor: 'white',
		flexGrow: 1,
		flexShrink: 0,
		padding: 8
	}
})

const mapStateToProps = state => {
	return {
		error: state.conversations.currentConversation.error,
		isLoading: state.conversations.currentConversation.isLoading,
		messages: state.conversations.currentConversation.messages.map(
			(mes, index) =>
				processMessages(
					mes,
					index,
					state.conversation.currentConversation.messages
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

import PropTypes from 'prop-types'
import React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import MessageItem from '../../../components/MessageItem/MessageItem'
import { fetchMessages } from './scenario-actions'

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

	render() {
		return (
			<ScrollView
				contentContainerStyle={styles.scrollViewContainer}
				refreshControl={
					<RefreshControl
						refreshing={this.props.isLoading}
						onRefresh={() => this.askForMessages()}
					/>
				}
			>
				{this.props.messages.map(mes => (
					<MessageItem message={mes} onClick={() => {}} key={mes.id} />
				))}
			</ScrollView>
		)
	}
}

MessagePage.propTypes = {
	fetchMessages: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	messages: PropTypes.array.isRequired,
	error: PropTypes.string
}

const styles = EStyleSheet.create({
	scrollViewContainer: {
		backgroundColor: 'white',
		flexGrow: 1,
		padding: 8
	}
})

const mapStateToProps = state => {
	return {
		error: state.conversations.currentConversation.error,
		isLoading: state.conversations.currentConversation.isLoading,
		messages: state.conversations.currentConversation.messages
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchMessages: (hid, conversation) =>
			dispatch(fetchMessages(hid, conversation))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MessagePage)

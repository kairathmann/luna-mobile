import PropTypes from 'prop-types'
import React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { NavigationEvents } from 'react-navigation'
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
				<NavigationEvents />
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
	},
	errorTextContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	errorText: {
		fontSize: '1.2rem'
	},
	noMessageText: {
		fontSize: '1.2rem',
		textAlign: 'center',
		fontFamily: 'Lato-Regular',
		paddingTop: '2rem'
	},
	palmTreeImage: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		width: 256,
		height: 256
	},
	newMessageContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: '0.8rem'
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

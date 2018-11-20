import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchConversations } from './scenario-actions'
import { GENDER } from '../../../enums'
import { styles as commonStyles } from '../../../styles'
import ConversationsList from '../../../components/ConversationsList'

class ConversationsPage extends React.Component {
	componentDidMount() {
		this.refreshConversations()
	}

	refreshConversations = () => {
		// REFACTOR AS SOON AS ANDRZEJS CHANGES WITH PROFILE LOADING ARE MERGED
		this.props.fetchConversations('2a569236')
	}

	render() {
		return (
			<React.Fragment>
				{this.props.isLoadingConversations && (
					<View style={commonStyles.content} />
				)}
				{!this.props.isLoadingConversations &&
					this.props.conversations.length > 0 && (
						<ConversationsList
							conversations={this.props.conversations}
							onRefresh={this.refreshConversations}
							refreshing={this.props.isLoadingConversations}
						/>
					)}
			</React.Fragment>
		)
		// {!this.props.isLoadingConversations && this.props.conversations.length === 0 && ()}
	}
}

ConversationsPage.propTypes = {
	fetchConversations: PropTypes.func.isRequired,
	isLoadingConversations: PropTypes.bool.isRequired,
	conversations: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			lastMessageSenderHid: PropTypes.string.isRequired,
			lastUpdate: PropTypes.string.isRequired,
			partnerAvatarMedium: PropTypes.string.isRequired,
			partnerAvatarSmall: PropTypes.string.isRequired,
			partnerGender: PropTypes.oneOf([
				GENDER.BOTH,
				GENDER.FEMALE,
				GENDER.MALE,
				GENDER.OTHER
			]).isRequired,
			partnerHid: PropTypes.string.isRequired,
			partnerName: PropTypes.string.isRequired,
			pending: PropTypes.bool.isRequired,
			subject: PropTypes.string.isRequired
		})
	).isRequired
}

const mapStateToProps = state => {
	return {
		isLoadingConversations: state.conversations.isLoading,
		conversations: state.conversations.conversations
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchConversations: targetHid => dispatch(fetchConversations(targetHid))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConversationsPage)

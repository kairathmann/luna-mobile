import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Badge, Text } from 'native-base'
import { notifications } from '../../styles'

const ConversationsBadgeIcon = ({ unreadConcersationsCount }) => (
	<React.Fragment>
		{unreadConcersationsCount > 0 && (
			<Badge style={notifications.badgeOnAsNavigationIcon}>
				<Text style={notifications.badgeText}>
					{unreadConcersationsCount > 99 ? '99' : unreadConcersationsCount}
				</Text>
			</Badge>
		)}
	</React.Fragment>
)

ConversationsBadgeIcon.propTypes = {
	unreadConcersationsCount: PropTypes.number
}

const mapStateToProps = state => {
	return {
		unreadConcersationsCount: state.conversations.conversations.filter(
			message => message.pending
		).length
	}
}

export default connect(
	mapStateToProps,
	null
)(ConversationsBadgeIcon)

import React from 'react'
import { Text, RefreshControl, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'
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
			<ScrollView
				contentContainerStyle={commonStyles.content}
				refreshControl={
					<RefreshControl
						refreshing={this.props.isLoadingConversations}
						onRefresh={this.refreshConversations}
					/>
				}
			>
				{this.props.isLoadingConversations && (
					<View style={commonStyles.content} />
				)}
				{!this.props.isLoadingConversations &&
					!this.props.isFetchingConversationsError &&
					this.props.conversations.length > 0 && (
						<ConversationsList conversations={this.props.conversations} />
					)}
				{!this.props.isLoadingConversations &&
					this.props.isFetchingConversationsError && (
						<View style={styles.errorTextContainer}>
							<Text style={[commonStyles.errorText, styles.errorText]}>
								{I18n.t(
									'conversations_page.error_could_not_fetch_conversations'
								)}
							</Text>
						</View>
					)}
			</ScrollView>
		)
		// {!this.props.isLoadingConversations && this.props.conversations.length === 0 && ()}
	}
}

ConversationsPage.propTypes = {
	fetchConversations: PropTypes.func.isRequired,
	isFetchingConversationsError: PropTypes.bool.isRequired,
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

const styles = EStyleSheet.create({
	errorTextContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	errorText: {
		fontSize: '1.2rem'
	}
})

const mapStateToProps = state => {
	return {
		isFetchingConversationsError:
			state.conversations.isFetchingConversationsError,
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

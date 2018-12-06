import { Badge, H3, Text as NativeBaseText } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import PalmTree from '../../../assets/images/palm-tree.png'
import ConversationsList from '../../../components/ConversationsList'
import SearchHeader from '../../../components/SearchHeader/SearchHeader'
import { GENDER } from '../../../enums'
import { PAGES_NAMES } from '../../../navigation'
import { conversationsListTimerService } from '../../../services'
import { notifications, styles as commonStyles } from '../../../styles'
import { fetchConversations } from './scenario-actions'

class ConversationsPage extends React.Component {
	state = {
		searchText: ''
	}

	_onSearch = text => {
		this.setState({
			searchText: text
		})
	}

	refreshConversations = () => {
		// when conversations view got refreshed due to entry on view or manual pull to refresh
		// then reset the timer
		conversationsListTimerService.resetTimer()
		this.props.fetchConversations(this.props.targetHid)
	}

	renderNewMessageCountView = newMessageCount => (
		<View style={styles.newMessageContainer}>
			<H3>{I18n.t('conversations_page.new_messages')}</H3>
			<Badge style={notifications.badge}>
				<NativeBaseText style={notifications.badgeText}>
					{newMessageCount > 9 ? '+9' : newMessageCount}
				</NativeBaseText>
			</Badge>
		</View>
	)

	renderNoMessagesView = () => (
		<View style={commonStyles.content}>
			<H3 style={styles.noMessageText}>
				{I18n.t('conversations_page.no_messages')}
			</H3>
			<Image
				style={styles.palmTreeImage}
				resizeMode="contain"
				source={PalmTree}
			/>
		</View>
	)

	handleClick = conversation => {
		this.props.navigation.navigate(PAGES_NAMES.SINGLE_MESSAGE_PAGE, {
			conversation,
			targetHid: this.props.targetHid
		})
	}

	render() {
		const { searchText } = this.state
		return (
			<View style={{ flex: 1 }}>
				<SearchHeader onSearch={this._onSearch} />
				<ScrollView
					contentContainerStyle={styles.scrollViewContainer}
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
							<React.Fragment>
								{this.props.newMessageCount > 0 &&
									this.renderNewMessageCountView(this.props.newMessageCount)}
								<ConversationsList
									handleClick={this.handleClick}
									conversations={this.props.conversations.filter(con =>
										con.partnerName
											.toLowerCase()
											.includes(searchText.toLowerCase())
									)}
								/>
							</React.Fragment>
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
					{!this.props.isLoadingConversations &&
						!this.props.isFetchingConversationsError &&
						this.props.conversations.length === 0 &&
						this.renderNoMessagesView()}
				</ScrollView>
			</View>
		)
	}
}

ConversationsPage.propTypes = {
	fetchConversations: PropTypes.func.isRequired,
	isFetchingConversationsError: PropTypes.bool.isRequired,
	isLoadingConversations: PropTypes.bool.isRequired,
	newMessageCount: PropTypes.number.isRequired,
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
	).isRequired,
	targetHid: PropTypes.string.isRequired,
	navigation: PropTypes.object.isRequired
}

const styles = EStyleSheet.create({
	scrollViewContainer: {
		backgroundColor: 'white',
		flexGrow: 1,
		flex: 1
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
		isFetchingConversationsError:
			state.conversations.isFetchingConversationsError,
		isLoadingConversations: state.conversations.isLoading,
		conversations: state.conversations.conversations,
		newMessageCount: state.conversations.conversations.filter(
			message => message.pending
		).length,
		targetHid: state.profile.profile.targetHid
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

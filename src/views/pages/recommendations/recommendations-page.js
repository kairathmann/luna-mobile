import { Button as NativeBaseButton, H3, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import {
	Dimensions,
	RefreshControl,
	ScrollView,
	Text,
	View
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import { isLandscape } from '../../../common/utils'
import Button from '../../../components/Button'
import LunaBackgroundImageView from '../../../components/LunaBackgroundImageView'
import UserMatchView from '../../../components/UserMatchView'
import { GENDER, ORIENTATION } from '../../../enums'
import { styles as commonStyles } from '../../../styles'
import {
	fetchRecommendations,
	switchToLoadingSkippedMatches,
	unmatch,
	match
} from './scenario-actions'
import { NavigationEvents } from 'react-navigation'

class RecommendationsPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			deviceOrientation: this.getDeviceOrientation()
		}
	}

	getDeviceOrientation = () => {
		const screenDimensions = Dimensions.get('screen')
		return isLandscape(screenDimensions.width, screenDimensions.height)
			? ORIENTATION.LANDSCAPE
			: ORIENTATION.PORTRAIT
	}

	unmatchRecommendation = userId => {
		this.props.unmatchRecommendation(userId)
	}

	matchRecommendation = user => {
		this.props.matchRecommendation(user)
	}

	onLayout = () => {
		const newDeviceOrientation = this.getDeviceOrientation()
		if (newDeviceOrientation !== this.state.deviceOrientation) {
			this.setState({
				deviceOrientation: this.getDeviceOrientation()
			})
		}
	}

	onShowSkippedMatchesButtonClick = () => {
		this.props.showSkippedMatches()
		this.props.fetchRecommendations()
	}

	onPullToRefresh = () => {
		this.props.fetchRecommendations()
	}

	renderUnmatchButton = styleToAdd => (
		<NativeBaseButton
			rounded
			icon
			style={[styles.declineButton, styleToAdd]}
			onPress={() => {
				this.unmatchRecommendation(this.props.currentlyRenderRecommendation.hid)
			}}
		>
			<Icon
				type="MaterialCommunityIcons"
				name="close"
				style={{ color: 'black', marginLeft: 0, marginRight: 0 }}
			/>
		</NativeBaseButton>
	)

	renderMessageButton = () => (
		<NativeBaseButton rounded icon style={styles.messageButton}>
			<Icon
				type="MaterialCommunityIcons"
				name="email-outline"
				onPress={() => {
					this.matchRecommendation(this.props.currentlyRenderRecommendation)
				}}
				style={{ color: 'white', marginLeft: 0, marginRight: 0 }}
			/>
		</NativeBaseButton>
	)

	renderPortraitContent = () => (
		<React.Fragment>
			<View style={styles.userProfileContainerPortrait}>
				<UserMatchView userProfile={this.props.currentlyRenderRecommendation} />
			</View>
			<View style={styles.buttonsColumnContainer}>
				<View style={styles.buttonsRowContainer}>
					{this.renderUnmatchButton(styles.declineButtonPortrait)}
					{this.renderMessageButton()}
				</View>
			</View>
		</React.Fragment>
	)

	renderNoMatchesMessage = () => (
		<LunaBackgroundImageView>
			<View style={styles.noMatchesViewContainer}>
				<H3 style={styles.noMatchesText}>
					{I18n.t('recommendations_page.no_matches_could_not_locate')}
				</H3>
				<H3 style={styles.noMatchesText}>
					{I18n.t('recommendations_page.no_matches_check_later')}
				</H3>
				<Button
					text={I18n.t('recommendations_page.no_matches_button_text')}
					onPress={this.onShowSkippedMatchesButtonClick}
				/>
			</View>
		</LunaBackgroundImageView>
	)

	renderLandscapeContent = () => (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<View style={styles.buttonsColumnContainer}>
				<View style={styles.buttonWrapperLandscape}>
					{this.renderUnmatchButton()}
				</View>
			</View>
			<View style={styles.userProfileLandscape}>
				<UserMatchView userProfile={this.props.currentlyRenderRecommendation} />
			</View>
			<View style={styles.buttonsColumnContainer}>
				<View style={styles.buttonWrapperLandscape}>
					{this.renderMessageButton()}
				</View>
			</View>
		</View>
	)

	renderContent = () => {
		return this.state.deviceOrientation === ORIENTATION.PORTRAIT
			? this.renderPortraitContent()
			: this.renderLandscapeContent()
	}

	render() {
		return (
			<React.Fragment>
				<NavigationEvents onWillFocus={this.props.fetchRecommendations} />
				<ScrollView
					contentContainerStyle={commonStyles.content}
					onLayout={this.onLayout}
					refreshControl={
						<RefreshControl
							refreshing={this.props.isLoading}
							onRefresh={this.onPullToRefresh}
						/>
					}
				>
					{this.props.isFetchingRecommendationsError && (
						<View style={styles.errorTextContainer}>
							<Text style={[commonStyles.errorText, styles.errorText]}>
								{I18n.t(
									'recommendations_page.error_could_not_fetch_recommendations'
								)}
							</Text>
						</View>
					)}
					{!this.props.isFetchingRecommendationsError &&
						this.props.currentlyRenderRecommendation &&
						this.renderContent()}
					{!this.props.isLoading &&
						!this.props.isFetchingRecommendationsError &&
						this.props.matchesCount === 0 &&
						this.renderNoMatchesMessage()}
				</ScrollView>
			</React.Fragment>
		)
	}
}

const styles = EStyleSheet.create({
	userProfileContainerPortrait: {
		flex: 8,
		justifyContent: 'flex-start',
		backgroundColor: '#f6f6f6',
		padding: '0.9rem'
	},
	userProfileLandscape: {
		flex: 6,
		paddingTop: '0.9rem',
		paddingBottom: '0.9rem'
	},
	buttonsColumnContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonWrapperLandscape: {
		flex: 1,
		justifyContent: 'center'
	},
	buttonsRowContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	declineButton: {
		width: 64,
		height: 64,
		backgroundColor: 'white',
		borderWidth: 1,
		justifyContent: 'center',
		borderColor: 'black'
	},
	declineButtonPortrait: {
		marginRight: '2rem'
	},
	messageButton: {
		width: 64,
		height: 64,
		backgroundColor: '#862b91',
		justifyContent: 'center'
	},
	errorTextContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	errorText: {
		fontSize: '1.2rem'
	},
	noMatchesViewContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	noMatchesText: {
		fontFamily: 'Lato-Regular',
		color: 'white',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '1.1rem',
		fontWeight: '500',
		marginBottom: '1.5rem'
	}
})

RecommendationsPage.propTypes = {
	unmatchRecommendation: PropTypes.func.isRequired,
	showSkippedMatches: PropTypes.func.isRequired,
	fetchRecommendations: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isFetchingRecommendationsError: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
	matchesCount: PropTypes.number.isRequired,
	currentlyRenderRecommendation: PropTypes.shape({
		bio: PropTypes.string,
		firstName: PropTypes.string.isRequired,
		avatarUrl: PropTypes.string.isRequired,
		hid: PropTypes.string.isRequired,
		tagline: PropTypes.string,
		gidIs: PropTypes.oneOf([
			GENDER.MALE,
			GENDER.FEMALE,
			GENDER.BOTH,
			GENDER.OTHER
		]).isRequired,
		age: PropTypes.number.isRequired,
		minBid: PropTypes.string.isRequired
	}),
	isShowingSkipped: PropTypes.bool.isRequired,
	matchRecommendation: PropTypes.func.isRequired
}

const mapStateToProps = state => {
	return {
		isLoading: state.recommendations.isLoading,
		isFetchingRecommendationsError:
			state.recommendations.isFetchingRecommendationsError,
		errorMessage: state.recommendations.errorMessage,
		//TODO: Refactor later on to selectors or something similar
		matchesCount: state.recommendations.recommendations.length,
		//TODO: Refactor later on to selectors or something similar
		currentlyRenderRecommendation: state.recommendations.recommendations[0],
		isShowingSkipped: state.recommendations.isShowingSkipped
	}
}

const mapDispatchToProps = dispatch => {
	return {
		unmatchRecommendation: userId => dispatch(unmatch(userId)),
		showSkippedMatches: () => dispatch(switchToLoadingSkippedMatches()),
		fetchRecommendations: () => dispatch(fetchRecommendations()),
		matchRecommendation: user => dispatch(match(user))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecommendationsPage)

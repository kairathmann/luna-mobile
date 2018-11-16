import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'
import { unmatch } from './scenario-actions'
import { styles as commonStyles } from '../../../styles'
import { GENDER, ORIENTATION } from '../../../enums'
import { isLandscape } from '../../../common/utils'
import UserMatchView from '../../../components/UserMatchView'

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

	onLayout = () => {
		const newDeviceOrientation = this.getDeviceOrientation()
		if (newDeviceOrientation !== this.state.deviceOrientation) {
			this.setState({
				deviceOrientation: this.getDeviceOrientation()
			})
		}
	}

	renderUnmatchButton = styleToAdd => (
		<Button
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
		</Button>
	)

	renderMessageButton = () => (
		<Button rounded icon style={styles.messageButton}>
			<Icon
				type="MaterialCommunityIcons"
				name="email-outline"
				style={{ color: 'white', marginLeft: 0, marginRight: 0 }}
			/>
		</Button>
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
			<View style={commonStyles.content} onLayout={this.onLayout}>
				{!this.props.isLoading &&
					this.props.isFetchingRecommendationsError && (
						<View style={styles.errorTextContainer}>
							<Text style={[commonStyles.errorText, styles.errorText]}>
								{I18n.t(
									'recommendations_page.error_could_not_fetch_recommendations'
								)}
							</Text>
						</View>
					)}
				{!this.props.isLoading &&
					!this.props.isFetchingRecommendationsError &&
					this.props.currentlyRenderRecommendation &&
					this.renderContent()}
			</View>
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
		width: 60,
		height: 60,
		backgroundColor: 'white',
		borderWidth: 1,
		justifyContent: 'center',
		borderColor: 'black'
	},
	declineButtonPortrait: {
		marginRight: '2rem'
	},
	messageButton: {
		width: 60,
		height: 60,
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
	}
})

RecommendationsPage.propTypes = {
	unmatchRecommendation: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isFetchingRecommendationsError: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
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
	})
}

const mapStateToProps = state => {
	return {
		isLoading: state.recommendations.isLoading,
		isFetchingRecommendationsError:
			state.recommendations.isFetchingRecommendationsError,
		errorMessage: state.recommendations.errorMessage,
		//TODO: Refactor later on to selectors or something similar
		currentlyRenderRecommendation: state.recommendations.recommendations[0]
	}
}

const mapDispatchToProps = dispatch => {
	return {
		unmatchRecommendation: userId => dispatch(unmatch(userId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecommendationsPage)

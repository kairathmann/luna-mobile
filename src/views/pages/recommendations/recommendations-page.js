import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'
import { fetchRecommendations, unmatch } from './scenario-actions'
import { styles as commonStyles } from '../../../styles'
import { GENDER } from '../../../enums'
import UserMatchView from '../../../components/UserMatchView'

class RecommendationsPage extends React.Component {
	componentDidMount() {
		this.props.fetchRecommendations()
	}

	unmatchRecommendation = userId => {
		this.props.unmatchRecommendation(userId)
	}

	render() {
		return (
			<View style={commonStyles.content}>
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
					this.props.currentlyRenderRecommendation && (
						<React.Fragment>
							<View style={styles.userProfileContainer}>
								<UserMatchView
									userProfile={this.props.currentlyRenderRecommendation}
								/>
							</View>
							<View style={styles.buttonsColumnContainer}>
								<View style={styles.buttonsRowContainer}>
									<Button
										rounded
										icon
										style={styles.declineButton}
										onPress={() => {
											this.unmatchRecommendation(
												this.props.currentlyRenderRecommendation.hid
											)
										}}
									>
										<Icon
											type="MaterialCommunityIcons"
											name="close"
											style={{ color: 'black', marginLeft: 0, marginRight: 0 }}
										/>
									</Button>
									<Button rounded icon style={styles.messageButton}>
										<Icon
											type="MaterialCommunityIcons"
											name="email-outline"
											style={{ color: 'white', marginLeft: 0, marginRight: 0 }}
										/>
									</Button>
								</View>
							</View>
						</React.Fragment>
					)}
			</View>
		)
	}
}

const styles = EStyleSheet.create({
	userProfileContainer: {
		flex: 8,
		justifyContent: 'flex-start',
		backgroundColor: '#f6f6f6',
		padding: '0.9rem'
	},
	imageParent: {
		flex: 1,
		height: undefined,
		width: undefined
	},
	image: {
		borderRadius: '3.1rem'
	},
	userInfoContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: '3.1rem',
		borderBottomRightRadius: '3.1rem',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0
	},
	userInfoTextContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	userInfoText: {
		color: '#FFF',
		fontSize: '1.1rem',
		fontFamily: 'Lato-Regular',
		marginRight: '1rem'
	},
	buttonsColumnContainer: {
		flex: 2,
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
		borderColor: 'black',
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
	fetchRecommendations: PropTypes.func.isRequired,
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
		fetchRecommendations: () => dispatch(fetchRecommendations()),
		unmatchRecommendation: userId => dispatch(unmatch(userId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecommendationsPage)

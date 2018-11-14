import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import { ImageBackground, Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import { fetchRecommendations } from './scenario-actions'
import { styles as commonStyles } from '../../../styles'
import { checkImageURL, getLoaderImageForGender } from '../../../common/utils'
import { GENDER } from '../../../enums'

class RecommendationsPage extends React.Component {
	componentDidMount() {
		this.props.fetchRecommendations()
	}

	render() {
		return (
			<View style={commonStyles.content}>
				{!this.props.isLoading &&
					this.props.currentlyRenderRecommendation && (
						<React.Fragment>
							<View style={styles.userProfileContainer}>
								<ImageBackground
									imageStyle={styles.image}
									style={styles.imageParent}
									resizeMode="cover"
									source={checkImageURL(
										this.props.currentlyRenderRecommendation.avatarUrl
									)}
									defaultSource={getLoaderImageForGender(
										this.props.currentlyRenderRecommendation.gidIs
									)}
								>
									<View style={{ flex: 7 }} />
									<LinearGradient
										colors={['transparent', '#000']}
										style={styles.userInfoContainer}
									>
										<View style={styles.userInfoTextContainer}>
											<Text style={styles.userInfoText}>
												{`${
													this.props.currentlyRenderRecommendation.firstName
												}, ${this.props.currentlyRenderRecommendation.age}`}
											</Text>
											<Icon
												type="MaterialCommunityIcons"
												name="information-outline"
												style={{ color: 'white' }}
											/>
										</View>
									</LinearGradient>
								</ImageBackground>
							</View>
							<View style={styles.buttonsContainer} />
						</React.Fragment>
					)}
			</View>
		)
	}
}

const styles = EStyleSheet.create({
	userProfileContainer: {
		flex: 7,
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
		flex: 3,
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
	buttonsContainer: {
		flex: 3,
		justifyContent: 'flex-end'
	}
})

RecommendationsPage.propTypes = {
	fetchRecommendations: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isError: PropTypes.bool.isRequired,
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
		isError: state.recommendations.isError,
		errorMessage: state.recommendations.errorMessage,
		currentlyRenderRecommendation:
			state.recommendations.currentlyRenderRecommendation
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchRecommendations: () => dispatch(fetchRecommendations())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecommendationsPage)

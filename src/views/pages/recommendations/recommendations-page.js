import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
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
								<Image
									style={styles.image}
									resizeMode="cover"
									source={checkImageURL(
										this.props.currentlyRenderRecommendation.avatarUrl
									)}
									defaultSource={getLoaderImageForGender(
										this.props.currentlyRenderRecommendation.gidIs
									)}
								/>
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
	image: {
		flex: 1,
		height: undefined,
		width: undefined,
		borderRadius: '3.1rem'
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

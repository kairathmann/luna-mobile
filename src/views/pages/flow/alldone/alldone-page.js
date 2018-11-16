import { H3 } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Dimensions, Image, StatusBar, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { fetchRecommendations } from '../../recommendations/scenario-actions'
import I18n from '../../../../../locales/i18n'
import Background from '../../../../assets/images/luna_logo.png'
import { PAGES_NAMES } from '../../../../navigation/pages'
import { LUNA_BACKGROUND_COLOR } from '../../../../styles/colors'

const LOAD_FEED_PAGE_DELAY = 5000

const { width } = Dimensions.get('window')

export class AlldonePage extends React.Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.fetchRecommendations()
			this.props.navigation.navigate(PAGES_NAMES.HOME_PAGE)
		}, LOAD_FEED_PAGE_DELAY)
	}

	render() {
		return (
			<View style={[styles.content, styles.allDoneContainer]}>
				<StatusBar backgroundColor={LUNA_BACKGROUND_COLOR} />
				<Image style={styles.image} source={Background} />
				<View style={styles.textContainer}>
					<H3 style={styles.prompt}>{I18n.t('flow_page.alldone.prompt')}</H3>
				</View>
			</View>
		)
	}
}

AlldonePage.propTypes = {
	navigation: PropTypes.object.isRequired,
	fetchRecommendations: PropTypes.func.isRequired
}

const styles = EStyleSheet.create({
	content: {
		flex: 1
	},
	image: {
		width: width - 32, // twice a margin
		height: width - 32 // twice a margin,
	},
	allDoneContainer: {
		width: '100%',
		backgroundColor: LUNA_BACKGROUND_COLOR,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textContainer: {
		position: 'absolute',
		flex: 1
	},
	prompt: {
		marginLeft: 32,
		marginRight: 32,
		color: 'white',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		lineHeight: 30
	}
})

const mapDispatchToProps = dispatch => {
	return {
		fetchRecommendations: () => dispatch(fetchRecommendations())
	}
}

export default connect(
	null,
	mapDispatchToProps
)(AlldonePage)

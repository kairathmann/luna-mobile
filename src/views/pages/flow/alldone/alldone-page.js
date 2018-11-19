import { H3 } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { fetchRecommendations } from '../../recommendations/scenario-actions'
import I18n from '../../../../../locales/i18n'
import { PAGES_NAMES } from '../../../../navigation/pages'
import LunaBackgroundImageView from '../../../../components/LunaBackgroundImageView'

const LOAD_FEED_PAGE_DELAY = 5000

export class AlldonePage extends React.Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.fetchRecommendations()
			this.props.navigation.navigate(PAGES_NAMES.HOME_PAGE)
		}, LOAD_FEED_PAGE_DELAY)
	}

	render() {
		return (
			<LunaBackgroundImageView>
				<View style={styles.textContainer}>
					<H3 style={styles.prompt}>{I18n.t('flow_page.alldone.prompt')}</H3>
				</View>
			</LunaBackgroundImageView>
		)
	}
}

AlldonePage.propTypes = {
	navigation: PropTypes.object.isRequired,
	fetchRecommendations: PropTypes.func.isRequired
}

const styles = EStyleSheet.create({
	textContainer: {
		justifyContent: 'center',
		flex: 1
	},
	prompt: {
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

import { Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import {
	Image,
	ImageBackground,
	ScrollView,
	StatusBar,
	View
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WomanBackground from '../../../assets/images/woman-welcome-page-background.jpg'
import LunaLogoText from '../../../assets/logos/luna-logo-with-text.png'
import Button from '../../../components/Button'
import { PAGES_NAMES } from '../../../navigation'
import { startup } from './scenario-actions'

class WelcomePage extends React.Component {
	componentDidMount() {
		this.props.startup()
	}

	render() {
		const { navigate } = this.props.navigation
		return (
			<React.Fragment>
				<StatusBar backgroundColor={'transparent'} translucent={true} />
				<ImageBackground
					source={WomanBackground}
					style={styles.container}
					blurRadius={5}
				>
					<ScrollView contentContainerStyle={styles.scrolledContent}>
						<View style={styles.content}>
							<View style={styles.logo}>
								<Image source={LunaLogoText} />
								<Text style={styles.logoTitle} adjustsFontSizeToFit>
									{I18n.t('welcome_page.app_description')}
								</Text>
							</View>
							<View style={styles.buttonsContainer}>
								<Button
									text={I18n.t('welcome_page.signup')}
									onPress={() => {
										navigate(PAGES_NAMES.SIGNUP_PAGE)
									}}
									buttonStyle={styles.button}
								/>
								<Button
									text={I18n.t('welcome_page.login')}
									onPress={() => {
										navigate(PAGES_NAMES.LOGIN_PAGE)
									}}
									buttonStyle={styles.button}
								/>
							</View>
						</View>
					</ScrollView>
				</ImageBackground>
			</React.Fragment>
		)
	}
}

WelcomePage.propTypes = {
	navigation: PropTypes.object,
	startup: PropTypes.func.isRequired
}

const styles = EStyleSheet.create({
	content: {
		flex: 1
	},
	scrolledContent: {
		flexGrow: 1
	},
	buttonsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: '1rem'
	},
	button: {
		alignSelf: 'center',
		maxWidth: 256
	},
	container: {
		width: '100%',
		height: '100%'
	},
	logo: {
		paddingTop: '2rem',
		paddingRight: '1rem',
		paddingLeft: '1rem',
		paddingBottom: '1rem',
		flex: 1,
		alignItems: 'center'
	},
	logoTitle: {
		fontSize: '1rem',
		marginTop: '2rem',
		fontWeight: '400',
		letterSpacing: '0.08rem',
		color: 'white'
	}
})

const mapDispatchToProps = dispatch => {
	return {
		startup: () => dispatch(startup())
	}
}

export default connect(
	null,
	mapDispatchToProps
)(WelcomePage)

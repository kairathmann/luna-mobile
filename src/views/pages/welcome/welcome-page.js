import { Button, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, ImageBackground, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'
import { PAGES_NAMES } from '../../../navigation'
import LunaLogoText from '../../../assets/logos/luna-logo-with-text.png'
import WomanBackground from '../../../assets/images/woman-welcome-page-background.jpg'

class WelcomePage extends React.Component {
	render() {
		const { navigate } = this.props.navigation
		return (
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
								style={styles.button}
								onPress={() => {
									navigate(PAGES_NAMES.SIGNUP_PAGE)
								}}
							>
								<Text style={styles.buttonText}>
									{I18n.t('welcome_page.signup')}
								</Text>
							</Button>
							<Button
								style={styles.button}
								onPress={() => {
									navigate(PAGES_NAMES.LOGIN_PAGE)
								}}
							>
								<Text style={styles.buttonText}>
									{I18n.t('welcome_page.login')}
								</Text>
							</Button>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		)
	}
}

WelcomePage.propTypes = {
	navigation: PropTypes.object
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
		marginBottom: '1rem',
		backgroundColor: '#862b91',
		width: '100%',
		maxWidth: 200,
		alignSelf: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		justifyContent: 'center'
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

export default WelcomePage

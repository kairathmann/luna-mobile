import { createStackNavigator } from 'react-navigation'
import I18n from '../../locales/i18n'
import LoginPage from '../views/pages/login/login-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'

const PAGES_NAMES = {
	WELCOME_PAGE: 'WELCOME_PAGE',
	LOGIN_PAGE: 'LOGIN_PAGE',
	SIGNUP_PAGE: 'SIGNUP_PAGE'
}

const commonNavBarStyle = {
	headerStyle: {
		backgroundColor: '#603695'
	},
	headerTitleStyle: {
		fontWeight: 'bold',
		color: '#FFF'
	},
	headerTintColor: '#FFF'
}

const AppStackNavigator = createStackNavigator({
	WELCOME_PAGE: {
		screen: WelcomePage,
		navigationOptions: () => ({
			header: null
		})
	},
	LOGIN_PAGE: {
		screen: LoginPage,
		navigationOptions: () => ({
			title: I18n.t('login_page.title'),
			...commonNavBarStyle
		})
	},
	SIGNUP_PAGE: {
		screen: SignupPage,
		navigationOptions: () => ({
			headerStyle: {
				backgroundColor: 'white',
				zIndex: 100,
				elevation: 0, //remove shadow on Android
				shadowOpacity: 0 //remove shadow on iOS
			}
		})
	}
})

export { PAGES_NAMES, AppStackNavigator }

import { createStackNavigator } from 'react-navigation'
import I18n from '../../locales/i18n'
import GenderPreferencesPage from '../views/pages/flow/gender-preferences/gender-preferences-page'
import NameBirthdayPage from '../views/pages/flow/name-birthday/name-birthday-page'
import LoginPage from '../views/pages/login/login-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'

const PAGES_NAMES = {
	WELCOME_PAGE: 'WELCOME_PAGE',
	LOGIN_PAGE: 'LOGIN_PAGE',
	SIGNUP_PAGE: 'SIGNUP_PAGE',
	NAME_BIRTHDAY: 'NAME_BIRTHDAY',
	GENDER_SEXUALITY: 'GENDER_SEXUALITY'
}

const noNavbarStyle = {
	headerStyle: {
		backgroundColor: 'white',
		zIndex: 100,
		elevation: 0, //remove shadow on Android
		shadowOpacity: 0 //remove shadow on iOS
	}
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
			...noNavbarStyle
		})
	},
	SIGNUP_PAGE: {
		screen: SignupPage,
		navigationOptions: () => ({
			...noNavbarStyle
		})
	},
	NAME_BIRTHDAY: {
		screen: NameBirthdayPage,
		navigationOptions: () => ({
			title: I18n.t('flow_page.title'),
			headerLeft: null,
			...noNavbarStyle
		})
	},
	GENDER_SEXUALITY: {
		screen: GenderPreferencesPage,
		navigationOptions: () => ({
			title: I18n.t('flow_page.title'),
			headerLeft: null,
			...noNavbarStyle
		})
	}
})

export { PAGES_NAMES, AppStackNavigator }

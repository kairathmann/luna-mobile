import React from 'react'
import { createStackNavigator } from 'react-navigation'
import I18n from '../../locales/i18n'
import AgeLimitPage from '../views/pages/flow/age-limit/age-limit-page'
import AlldonePage from '../views/pages/flow/alldone/alldone-page'
import AvatarPage from '../views/pages/flow/avatar/avatar-page'
import GenderPreferencesPage from '../views/pages/flow/gender-preferences/gender-preferences-page'
import NameBirthdayPage from '../views/pages/flow/name-birthday/name-birthday-page'
import TaglinePage from '../views/pages/flow/tagline/tagline-page'
import LoginPage from '../views/pages/login/login-page'
import ProfilePage from '../views/pages/profile/profile-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'
import { Button, Icon } from 'native-base'

const PAGES_NAMES = {
	WELCOME_PAGE: 'WELCOME_PAGE',
	LOGIN_PAGE: 'LOGIN_PAGE',
	SIGNUP_PAGE: 'SIGNUP_PAGE',
	FLOW_NAME_BIRTHDAY: 'FLOW_NAME_BIRTHDAY',
	FLOW_GENDER_SEXUALITY: 'FLOW_GENDER_SEXUALITY',
	FLOW_AGE_LIMIT: 'FLOW_AGE_LIMIT',
	FLOW_TAGLINE: 'FLOW_TAGLINE',
	FLOW_AVATAR: 'FLOW_AVATAR',
	FLOW_ALLDONE: 'FLOW_ALLDONE',
	PROFILE: 'PROFILE'
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
	FLOW_NAME_BIRTHDAY: {
		screen: NameBirthdayPage,
		navigationOptions: () => ({
			title: I18n.t('flow_page.title'),
			headerLeft: null,
			...noNavbarStyle,
			headerBackTitle: I18n.t('common.back')
		})
	},
	FLOW_GENDER_SEXUALITY: {
		screen: GenderPreferencesPage,
		navigationOptions: () => ({
			title: I18n.t('flow_page.title'),
			...noNavbarStyle,
			headerBackTitle: I18n.t('common.back')
		})
	},
	FLOW_AGE_LIMIT: {
		screen: AgeLimitPage,
		navigationOptions: () => ({
			title: I18n.t('flow_page.title'),
			...noNavbarStyle,
			headerBackTitle: I18n.t('common.back')
		})
	},
	FLOW_TAGLINE: {
		screen: TaglinePage,
		navigationOptions: () => ({
			title: I18n.t('flow_page.title'),
			...noNavbarStyle,
			headerBackTitle: I18n.t('common.back')
		})
	},
	FLOW_AVATAR: {
		screen: AvatarPage,
		navigationOptions: () => ({
			title: I18n.t('flow_page.title'),
			...noNavbarStyle,
			headerBackTitle: I18n.t('common.back')
		})
	},
	FLOW_ALLDONE: {
		screen: AlldonePage,
		navigationOptions: () => ({
			title: I18n.t('flow_page.title'),
			header: null
		})
	},
	PROFILE: {
		screen: ProfilePage,
		navigationOptions: ({ navigation }) => ({
			title: null,
			headerTintColor: 'white',
			headerTransparent: true,
			headerRight: (
				<Button
					icon
					transparent
					style={{ marginRight: 4, marginTop: 4 }}
					onPress={navigation.getParam('goToEditPage')}
					title={'edit'}
					color="#fff"
				>
					<Icon name={'create'} color={'white'} style={{ color: 'white' }} />
				</Button>
			),
			headerStyle: {
				zIndex: 100,
				elevation: 0, //remove shadow on Android
				shadowOpacity: 0 //remove shadow on iOS
			}
		})
	}
})

export { PAGES_NAMES, AppStackNavigator }

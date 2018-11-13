/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */
import React from 'react'
import { Image } from 'react-native'
import {
	createBottomTabNavigator,
	createStackNavigator
} from 'react-navigation'
import I18n from '../../locales/i18n'
import AgeLimitPage from '../views/pages/flow/age-limit/age-limit-page'
import GenderPreferencesPage from '../views/pages/flow/gender-preferences/gender-preferences-page'
import NameBirthdayPage from '../views/pages/flow/name-birthday/name-birthday-page'
import LoginPage from '../views/pages/login/login-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'
import RecommendationsPage from '../views/pages/recommendations/recommendations-page'
import ProfilePage from '../views/pages/profile/profile-page'
import MessagesPage from '../views/pages/messages/messages-page'

import { COLORS } from '../styles'
import ProfilePageInactiveNavigationIcon from '../assets/images/nav-icon-profile.png'
import ProfilePageActiveNavigationIcon from '../assets/images/nav-icon-profile-active.png'
import RecommendationsPageInactiveNavigationIcon from '../assets/images/nav-icon-luna.png'
import RecommendationsPageActiveNavigationIcon from '../assets/images/nav-icon-luna-active.png'
import MessagesPageInactiveNavigationIcon from '../assets/images/nav-icon-messages.png'
import MessagesPageActiveNavigationIcon from '../assets/images/nav-icon-messages-active.png'

const PAGES_NAMES = {
	WELCOME_PAGE: 'WELCOME_PAGE',
	LOGIN_PAGE: 'LOGIN_PAGE',
	SIGNUP_PAGE: 'SIGNUP_PAGE',
	NAME_BIRTHDAY: 'NAME_BIRTHDAY',
	GENDER_SEXUALITY: 'GENDER_SEXUALITY',
	AGE_LIMIT: 'AGE_LIMIT',
	HOME_PAGE: 'HOME_PAGE',
	PROFILE_PAGE: 'PROFILE_PAGE',
	RECOMMENDATIONS_PAGE: 'RECOMMENDATIONS_PAGE',
	MESSAGES_PAGE: 'MESSAGES_PAGE'
}

const noNavbarStyle = {
	headerStyle: {
		backgroundColor: 'white',
		zIndex: 100,
		elevation: 0, //remove shadow on Android
		shadowOpacity: 0 //remove shadow on iOS
	}
}

const HomePageBottomTabNavigation = createBottomTabNavigator(
	{
		PROFILE_PAGE: {
			screen: ProfilePage,
			navigationOptions: () => ({
				title: '',
				tabBarIcon: ({ focused }) => (
					<Image
						source={
							focused
								? ProfilePageActiveNavigationIcon
								: ProfilePageInactiveNavigationIcon
						}
					/>
				),
				header: null
			})
		},
		RECOMMENDATIONS_PAGE: {
			screen: RecommendationsPage,
			navigationOptions: () => ({
				title: '',
				tabBarIcon: ({ focused }) => (
					<Image
						source={
							focused
								? RecommendationsPageActiveNavigationIcon
								: RecommendationsPageInactiveNavigationIcon
						}
					/>
				)
			})
		},
		MESSAGES_PAGE: {
			screen: MessagesPage,
			navigationOptions: () => ({
				title: '',
				tabBarIcon: ({ focused }) => (
					<Image
						source={
							focused
								? MessagesPageActiveNavigationIcon
								: MessagesPageInactiveNavigationIcon
						}
					/>
				)
			})
		}
	},
	{
		initialRouteName: PAGES_NAMES.RECOMMENDATIONS_PAGE,
		tabBarOptions: {
			style: {
				backgroundColor: COLORS.LUNA_PRIMARY_COLOR,
				position: 'absolute',
				left: 0,
				right: 0,
				bottom: 0
			},
			showLabel: false
		}
	}
)

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
			...noNavbarStyle
		})
	},
	AGE_LIMIT: {
		screen: AgeLimitPage,
		navigationOptions: () => ({
			title: I18n.t('flow_page.title'),
			...noNavbarStyle
		})
	},
	HOME_PAGE: {
		screen: HomePageBottomTabNavigation,
		navigationOptions: () => ({
			header: null
		})
	}
})

export { PAGES_NAMES, AppStackNavigator }

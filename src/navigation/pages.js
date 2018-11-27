import { Button, Icon } from 'native-base'
/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */
import React from 'react'
import { Image } from 'react-native'
import {
	createBottomTabNavigator,
	createStackNavigator
} from 'react-navigation'
import I18n from '../../locales/i18n'
import RecommendationsPageActiveNavigationIcon from '../assets/images/nav-icon-luna-active.png'
import RecommendationsPageInactiveNavigationIcon from '../assets/images/nav-icon-luna.png'
import MessagesPageActiveNavigationIcon from '../assets/images/nav-icon-messages-active.png'
import MessagesPageInactiveNavigationIcon from '../assets/images/nav-icon-messages.png'
import ProfilePageActiveNavigationIcon from '../assets/images/nav-icon-profile-active.png'
import ProfilePageInactiveNavigationIcon from '../assets/images/nav-icon-profile.png'
import { ORIENTATION } from '../enums'

import { COLORS } from '../styles'
import { LUNA_PRIMARY_COLOR } from '../styles/colors'
import AgeLimitPage from '../views/pages/flow/age-limit/age-limit-page'
import AlldonePage from '../views/pages/flow/alldone/alldone-page'
import AvatarPage from '../views/pages/flow/avatar/avatar-page'
import GenderPreferencesPage from '../views/pages/flow/gender-preferences/gender-preferences-page'
import NameBirthdayPage from '../views/pages/flow/name-birthday/name-birthday-page'
import TaglinePage from '../views/pages/flow/tagline/tagline-page'
import FullLoader from '../views/pages/loader/full-loader'
import LoginPage from '../views/pages/login/login-page'

import SignupPage from '../views/pages/signup/signup-page'
import ForgotPasswordPage from '../views/pages/forgot-password/forgot-password-page'
import WelcomePage from '../views/pages/welcome/welcome-page'
import RecommendationsPage from '../views/pages/recommendations/recommendations-page'
import ProfilePage from '../views/pages/profile/profile-page'
import MessagesPage from '../views/pages/messages/messages-page'

const PAGES_NAMES = {
	WELCOME_PAGE: 'WELCOME_PAGE',
	LOGIN_PAGE: 'LOGIN_PAGE',
	SIGNUP_PAGE: 'SIGNUP_PAGE',
	FORGOT_PASSWORD_PAGE: 'FORGOT_PASSWORD_PAGE',
	HOME_PAGE: 'HOME_PAGE',
	RECOMMENDATIONS_PAGE: 'RECOMMENDATIONS_PAGE',
	MESSAGES_PAGE: 'MESSAGES_PAGE',
	FLOW_NAME_BIRTHDAY: 'FLOW_NAME_BIRTHDAY',
	FLOW_GENDER_SEXUALITY: 'FLOW_GENDER_SEXUALITY',
	FLOW_AGE_LIMIT: 'FLOW_AGE_LIMIT',
	FLOW_TAGLINE: 'FLOW_TAGLINE',
	FLOW_AVATAR: 'FLOW_AVATAR',
	FLOW_ALLDONE: 'FLOW_ALLDONE',
	PROFILE: 'PROFILE',
	LOADER: 'LOADER',
	MESSAGE: 'MESSAGE_PAGE',
	SINGLE_MESSAGE_PAGE: 'SINGLE_MESSAGE_PAGE'
}

const noNavbarStyle = {
	headerStyle: {
		backgroundColor: 'white',
		zIndex: 100,
		elevation: 0, //remove shadow on Android
		shadowOpacity: 0 //remove shadow on iOS
	}
}

const MessagePageStackNavigation = createStackNavigator({
	MESSAGES_PAGE: {
		screen: MessagesPage,
		navigationOptions: () => ({
			title: ''
		})
	},
	SINGLE_MESSAGE_PAGE: {
		screen: MessagesPage,
		navigationOptions: () => ({
			title: ''
		})
	}
})

const ProfilePageStackNavigation = createStackNavigator({
	PROFILE: {
		screen: ProfilePage,
		navigationOptions: ({ navigation }) => ({
			title: '',
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
					<Icon
						name={'create'}
						color={'white'}
						style={{
							color:
								navigation.getParam('orientation') === ORIENTATION.LANDSCAPE
									? LUNA_PRIMARY_COLOR
									: 'white'
						}}
					/>
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

const HomePageBottomTabNavigation = createBottomTabNavigator(
	{
		PROFILE: {
			screen: ProfilePageStackNavigation,
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
				)
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
			screen: MessagePageStackNavigation,
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
				backgroundColor: COLORS.LUNA_PRIMARY_COLOR
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
	FORGOT_PASSWORD_PAGE: {
		screen: ForgotPasswordPage,
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
	HOME_PAGE: {
		screen: HomePageBottomTabNavigation,
		navigationOptions: () => ({
			header: null
		})
	}
})

const RootStack = createStackNavigator(
	{
		Main: {
			screen: AppStackNavigator
		},
		LOADER: {
			screen: FullLoader
		}
	},
	{
		mode: 'modal',
		headerMode: 'none'
	}
)

export { PAGES_NAMES, RootStack }

/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */
import { Button, Icon } from 'native-base'
import React from 'react'
import { Image, ImageBackground, View } from 'react-native'
import {
	createBottomTabNavigator,
	createStackNavigator
} from 'react-navigation'
import I18n from '../../locales/i18n'
import RecommendationsPageActiveNavigationIcon from '../assets/images/nav-icon-luna-active.png'
import RecommendationsPageInactiveNavigationIcon from '../assets/images/nav-icon-luna.png'
import ConversationsPageActiveNavigationIcon from '../assets/images/nav-icon-messages-active.png'
import ConversationsPageInactiveNavigationIcon from '../assets/images/nav-icon-messages.png'
import ProfilePageActiveNavigationIcon from '../assets/images/nav-icon-profile-active.png'
import ProfilePageInactiveNavigationIcon from '../assets/images/nav-icon-profile.png'

import ConversationsBadgeIcon from '../components/ConversationsBadgeIcon'
import { ORIENTATION } from '../enums'

import { COLORS } from '../styles'
import { LUNA_PRIMARY_COLOR } from '../styles/colors'
import ConversationsPage from '../views/pages/conversations/conversations-page'
import EditPage from '../views/pages/edit/edit-page'
import AgeLimitPage from '../views/pages/flow/age-limit/age-limit-page'
import AlldonePage from '../views/pages/flow/alldone/alldone-page'
import AvatarPage from '../views/pages/flow/avatar/avatar-page'
import GenderPreferencesPage from '../views/pages/flow/gender-preferences/gender-preferences-page'
import NameBirthdayPage from '../views/pages/flow/name-birthday/name-birthday-page'
import TaglinePage from '../views/pages/flow/tagline/tagline-page'
import ForgotPasswordPage from '../views/pages/forgot-password/forgot-password-page'
import { ConnectedLoader } from '../components/Loader'
import LoginPage from '../views/pages/login/login-page'
import ManageProfilePage from '../views/pages/manageprofile/manage-profile-page'
import {
	ManageDeleteReasonPage,
	ManageDisableReasonPage
} from '../views/pages/manageprofile/manage-reason-page'
import MessagePage from '../views/pages/message/message-page'
import ProfilePage from '../views/pages/profile/profile-page'
import RecommendationsPage from '../views/pages/recommendations/recommendations-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'
import BidMessagePage from '../views/pages/bid-message/bid-message-page'

import { navigationService } from '../services'

const PAGES_NAMES = {
	WELCOME_PAGE: 'WELCOME_PAGE',
	LOGIN_PAGE: 'LOGIN_PAGE',
	SIGNUP_PAGE: 'SIGNUP_PAGE',
	FORGOT_PASSWORD_PAGE: 'FORGOT_PASSWORD_PAGE',
	HOME_PAGE: 'HOME_PAGE',
	RECOMMENDATIONS_PAGE: 'RECOMMENDATIONS_PAGE',
	CONVERSATIONS_PAGE: 'CONVERSATIONS_PAGE',
	FLOW_NAME_BIRTHDAY: 'FLOW_NAME_BIRTHDAY',
	FLOW_GENDER_SEXUALITY: 'FLOW_GENDER_SEXUALITY',
	FLOW_AGE_LIMIT: 'FLOW_AGE_LIMIT',
	FLOW_TAGLINE: 'FLOW_TAGLINE',
	FLOW_AVATAR: 'FLOW_AVATAR',
	FLOW_ALLDONE: 'FLOW_ALLDONE',
	PROFILE: 'PROFILE',
	MESSAGE: 'MESSAGE_PAGE',
	SINGLE_MESSAGE_PAGE: 'SINGLE_MESSAGE_PAGE',
	EDIT_PROFILE: 'EDIT_PROFILE',
	MANAGE_PROFILE: 'MANAGE_PROFILE',
	MANAGE_DISABLE: 'MANAGE_DISABLE',
	MANAGE_DELETE: 'MANAGE_DELETE',
	BID_MESSAGE: 'BID_MESSAGE'
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
	CONVERSATIONS_PAGE: {
		screen: ConversationsPage,
		navigationOptions: () => ({
			title: '',
			header: null
		})
	},
	SINGLE_MESSAGE_PAGE: {
		screen: MessagePage,
		navigationOptions: ({ navigation }) => ({
			title: navigation.getParam('title'),
			headerTintColor: 'white',
			headerStyle: { backgroundColor: LUNA_PRIMARY_COLOR }
		})
	}
})

const RecommendationPageStackNavigation = createStackNavigator({
	RECOMMENDATIONS_PAGE: {
		screen: RecommendationsPage,
		navigationOptions: () => ({
			title: '',
			header: null
		})
	},
	BID_MESSAGE: {
		screen: BidMessagePage,
		navigationOptions: ({ navigation }) => ({
			title: navigation.getParam('title'),
			headerTintColor: 'white',
			headerStyle: { backgroundColor: LUNA_PRIMARY_COLOR }
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
	},
	MANAGE_PROFILE: {
		screen: ManageProfilePage,
		navigationOptions: () => ({
			title: I18n.t('manage_page.title'),
			headerTintColor: 'white',
			headerStyle: { backgroundColor: LUNA_PRIMARY_COLOR }
		})
	},
	MANAGE_DISABLE: {
		screen: ManageDisableReasonPage,
		navigationOptions: () => ({
			title: I18n.t('manage_page.title'),
			headerTintColor: 'white',
			headerStyle: { backgroundColor: LUNA_PRIMARY_COLOR }
		})
	},
	MANAGE_DELETE: {
		screen: ManageDeleteReasonPage,
		navigationOptions: () => ({
			title: I18n.t('manage_page.title'),
			headerTintColor: 'white',
			headerStyle: { backgroundColor: LUNA_PRIMARY_COLOR }
		})
	},
	EDIT_PROFILE: {
		screen: EditPage,
		navigationOptions: ({ navigation }) => ({
			title: I18n.t('edit_page.title'),
			headerTintColor: 'white',
			headerStyle: { backgroundColor: LUNA_PRIMARY_COLOR },
			headerRight: (
				<Button
					icon
					transparent
					disabled={navigation.getParam('disabled')}
					style={{
						marginRight: 4,
						marginTop: 4,
						opacity: navigation.getParam('disabled') ? 0.5 : 1.0
					}}
					onPress={navigation.getParam('saveProfile')}
					title={'save'}
					color="#fff"
				>
					<Icon name={'done-all'} color={'white'} style={{ color: 'white' }} />
				</Button>
			)
		})
	}
})

const HomePageBottomTabNavigation = createBottomTabNavigator(
	{
		PROFILE_TAB: {
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
				),
				tabBarOnPress: ({ navigation }) =>
					navigation.navigate(PAGES_NAMES.PROFILE)
			})
		},
		RECOMMENDATIONS_TAB: {
			screen: RecommendationPageStackNavigation,
			navigationOptions: () => ({
				tabBarIcon: ({ focused }) => (
					<Image
						source={
							focused
								? RecommendationsPageActiveNavigationIcon
								: RecommendationsPageInactiveNavigationIcon
						}
					/>
				),
				tabBarOnPress: ({ navigation }) =>
					navigation.navigate(PAGES_NAMES.RECOMMENDATIONS_PAGE)
			})
		},
		CONVERSATIONS_TAB: {
			screen: MessagePageStackNavigation,
			navigationOptions: () => ({
				title: '',
				tabBarOnPress: ({ navigation }) =>
					navigation.navigate(PAGES_NAMES.CONVERSATIONS_PAGE),
				tabBarIcon: ({ focused }) => (
					<ImageBackground
						style={{
							width: 37,
							height: 34
						}}
						source={
							focused
								? ConversationsPageActiveNavigationIcon
								: ConversationsPageInactiveNavigationIcon
						}
					>
						<ConversationsBadgeIcon />
					</ImageBackground>
				)
			})
		}
	},
	{
		initialRouteName: 'RECOMMENDATIONS_TAB',
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

const AppStackNavigatorWithGlobalSupport = () => (
	<View style={{ flex: 1 }} forceInset={{ top: 'always' }}>
		<AppStackNavigator
			ref={navigatorRef => {
				navigationService.setTopLevelNavigator(navigatorRef)
			}}
			styles={{ position: 'absolute' }}
		/>
		<ConnectedLoader />
	</View>
)

export { AppStackNavigatorWithGlobalSupport, PAGES_NAMES }

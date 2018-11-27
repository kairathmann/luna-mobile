import SplashScreen from 'react-native-splash-screen'
import api from '../../../api'
import { PROFILE_STATE } from '../../../enums'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import { fetchProfileSuccess } from '../../../store/profile/actions'
import { conversationsListTimerService } from '../../../services'

export function startup() {
	return async dispatch => {
		try {
			const profileResponse = await api.fetchSelf()
			const profileData = profileResponse.data.data
			dispatch(fetchProfileSuccess(profileData))
			if (profileData.state === PROFILE_STATE.INCOMPLETE) {
				const flowPageToNavigateTo = profileData.firstName
					? PAGES_NAMES.FLOW_GENDER_SEXUALITY
					: PAGES_NAMES.FLOW_NAME_BIRTHDAY
				navigationService.navigate(flowPageToNavigateTo)
			} else {
				navigationService.navigate(PAGES_NAMES.HOME_PAGE)
				conversationsListTimerService.initializeService(
					dispatch,
					profileData.targetHid
				)
			}
		} catch (error) {
			navigationService.navigate(PAGES_NAMES.WELCOME_PAGE)
		} finally {
			SplashScreen.hide()
		}
	}
}
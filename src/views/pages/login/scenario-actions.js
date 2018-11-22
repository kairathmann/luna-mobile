import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import { signinError, signinSuccess } from '../../../store/auth/actions'
import { fetchProfileSuccess } from '../../../store/profile/actions'
import { PROFILE_STATE } from '../../../enums'

export function login({ email, password }) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			const loginResult = await api.signin({ email, password })
			dispatch(signinSuccess(loginResult))
			const profileResponse = await api.fetchSelf()
			const profileData = profileResponse.data.data
			dispatch(fetchProfileSuccess(profileData))
			if (profileData.state === PROFILE_STATE.INCOMPLETE) {
				// Profile is marked as COMPLETE as soon as user has filled up
				// name, date of birth and partner preferences
				// So, if first name already exists then go to partner preferences page
				// Otherwise go to first page of the flows
				const flowPageToNavigateTo = profileData.firstName
					? PAGES_NAMES.FLOW_GENDER_SEXUALITY
					: PAGES_NAMES.FLOW_NAME_BIRTHDAY
				navigationService.navigate(flowPageToNavigateTo)
			} else {
				navigationService.navigate(PAGES_NAMES.PROFILE)
			}
		} catch (error) {
			dispatch(signinError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

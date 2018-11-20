import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import { signinError, signinSuccess } from '../../../store/auth/actions'
import { fetchProfileSuccess } from '../../../store/profile/actions'

export function login({ email, password }) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			const loginResult = await api.signin({ email, password })
			dispatch(signinSuccess(loginResult))
			const profileResponse = await api.fetchSelf()
			dispatch(fetchProfileSuccess(profileResponse.data.data))
			navigationService.navigate(PAGES_NAMES.PROFILE)
		} catch (error) {
			dispatch(signinError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

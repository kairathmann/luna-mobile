import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { signinError, signinSuccess } from '../../../store/auth/actions'
import { fetchProfileSuccess } from '../../../store/profile/actions'

export function login({ email, password }) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			const result = await api.signin({ email, password })
			dispatch(signinSuccess(result))
			const profile = await api.fetchSelf()
			dispatch(fetchProfileSuccess(profile))
			navigationService.navigate(PAGES_NAMES.PROFILE)
		} catch (error) {
			dispatch(signinError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

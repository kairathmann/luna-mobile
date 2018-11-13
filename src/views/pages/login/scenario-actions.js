import { navigationService } from '../../../services'
import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { signinError, signinSuccess } from '../../../store/auth/actions'
import { PAGES_NAMES } from '../../../navigation'

export function login({ email, password }) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			const result = await api.signin({ email, password })
			dispatch(signinSuccess(result))
			navigationService.navigate(PAGES_NAMES.HOME_PAGE)
		} catch (error) {
			dispatch(signinError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

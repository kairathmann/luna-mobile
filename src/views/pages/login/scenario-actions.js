import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { signinError, signinSuccess } from '../../../store/auth/actions'

export function login({ email, password }) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			const result = await api.signin({ email, password })
			dispatch(signinSuccess(result))
			// TODO: uncomment when more screen will be ready
			navigationService.navigate(PAGES_NAMES.FLOW_AVATAR)
		} catch (error) {
			dispatch(signinError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

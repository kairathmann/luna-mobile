import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { signupError, signupSuccess } from '../../../store/auth/actions'

export function signup({ email, password }) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			const result = await api.signup({ email, password })
			dispatch(signupSuccess(result))
			navigationService.navigate(PAGES_NAMES.FLOW_NAME_BIRTHDAY)
		} catch (error) {
			dispatch(signupError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

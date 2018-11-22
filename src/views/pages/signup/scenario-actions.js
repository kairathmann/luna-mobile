import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import {
	clearSignUpError,
	signupError,
	signupSuccess
} from '../../../store/auth/actions'

export function signup({ email, password }) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			const result = await api.signup({ email, password })
			dispatch(signupSuccess(result))
			// TODO: uncomment when more screen will be ready
			navigationService.navigate(PAGES_NAMES.FLOW_AVATAR)
		} catch (error) {
			dispatch(signupError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

export const clearError = () => dispatch => dispatch(clearSignUpError())

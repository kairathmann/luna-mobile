import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import {
	clearSignUpError,
	signupError,
	signupSuccess
} from '../../../store/auth/actions'

export function signup({ email, password }) {
	return async dispatch => {
		try {
			navigationService.navigate(PAGES_NAMES.LOADER)
			const result = await api.signup({ email, password })
			dispatch(signupSuccess(result))
			navigationService.navigate(PAGES_NAMES.FLOW_NAME_BIRTHDAY)
		} catch (error) {
			dispatch(signupError(getErrorDataFromNetworkException(error)))
			navigationService.navigate(PAGES_NAMES.SIGNUP_PAGE)
		}
	}
}

export const clearError = () => dispatch => dispatch(clearSignUpError())

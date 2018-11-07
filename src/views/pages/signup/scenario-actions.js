import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { signupError, signupSuccess } from '../../../store/auth/actions'

export function signup({ email, password }) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			const result = await api.signup({ email, password })
			dispatch(signupSuccess(result))
			return
		} catch (error) {
			dispatch(
				signupError(getErrorDataFromNetworkException(error).errorMessage)
			)
		} finally {
			// TODO: Hide global loader
		}
	}
}

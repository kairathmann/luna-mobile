import { Answers } from 'react-native-fabric'
import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import {
	clearSignUpError,
	signupError,
	signupSuccess
} from '../../../store/auth/actions'
import { globalActions } from '../../../store/global'

export function signup({ email, password }) {
	return async dispatch => {
		try {
			dispatch(globalActions.setGlobalLoading())
			const result = await api.signup({ email, password })
			dispatch(signupSuccess(result))
			navigationService.navigate(PAGES_NAMES.FLOW_NAME_BIRTHDAY)
			Answers.logSignUp('APP', true)
		} catch (error) {
			dispatch(signupError(getErrorDataFromNetworkException(error)))
			Answers.logSignUp('APP', false)
		} finally {
			dispatch(globalActions.unsetGlobalLoading())
		}
	}
}

export const clearError = () => dispatch => dispatch(clearSignUpError())

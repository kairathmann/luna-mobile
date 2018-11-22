import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import {
	resetPasswordError,
	resetPasswordSuccess,
	clearResetPasswordError
} from '../../../store/auth/actions'
import I18n from '../../../../locales/i18n'
import { toastService } from '../../../services'

export const resetPassword = email => async dispatch => {
	try {
		// TODO: Show global loader
		await api.forgotPassword({ email })
		dispatch(resetPasswordSuccess())
		toastService.showSuccessToast(
			I18n.t('forgot_password_page.reset_password_success'),
			'top'
		)
	} catch (error) {
		dispatch(resetPasswordError(getErrorDataFromNetworkException(error)))
	} finally {
		// TODO: Hide global loader
	}
}

export const clearError = () => dispatch => dispatch(clearResetPasswordError())

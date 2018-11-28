import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import {
	resetPasswordError,
	resetPasswordSuccess,
	clearResetPasswordError
} from '../../../store/auth/actions'
import { globalActions } from '../../../store/global'
import I18n from '../../../../locales/i18n'
import { toastService } from '../../../services'

export const resetPassword = email => async dispatch => {
	try {
		dispatch(globalActions.setGlobalLoading())
		await api.forgotPassword({ email })
		dispatch(resetPasswordSuccess())
		toastService.showSuccessToast(
			I18n.t('forgot_password_page.reset_password_success'),
			'top'
		)
	} catch (error) {
		dispatch(resetPasswordError(getErrorDataFromNetworkException(error)))
	} finally {
		dispatch(globalActions.unsetGlobalLoading())
	}
}

export const clearError = () => dispatch => dispatch(clearResetPasswordError())

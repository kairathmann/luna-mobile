import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import {
	resetPasswordError,
	resetPasswordSuccess,
	clearResetPasswordError
} from '../../../store/auth/actions'
import I18n from '../../../../locales/i18n'
import { toastService } from '../../../services'

export const resetPassword = email => async dispatch => {
	try {
		navigationService.navigate(PAGES_NAMES.LOADER)
		await api.forgotPassword({ email })
		dispatch(resetPasswordSuccess())
		toastService.showSuccessToast(
			I18n.t('forgot_password_page.reset_password_success'),
			'top'
		)
	} catch (error) {
		dispatch(resetPasswordError(getErrorDataFromNetworkException(error)))
	} finally {
		navigationService.navigate(PAGES_NAMES.FORGOT_PASSWORD_PAGE)
	}
}

export const clearError = () => dispatch => dispatch(clearResetPasswordError())

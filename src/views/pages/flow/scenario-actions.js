// import {navigationService } from '../../../services'
import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { navigationService } from '../../../services'
import {
	saveProfileError,
	saveProfileSuccess
} from '../../../store/profile/actions'

export function saveChanges(changes, nextPage) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			await api.updateProfile(changes)
			dispatch(saveProfileSuccess(changes))
			navigationService.navigate(nextPage)
		} catch (error) {
			dispatch(saveProfileError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

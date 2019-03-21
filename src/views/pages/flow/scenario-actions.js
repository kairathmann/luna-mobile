import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { navigationService } from '../../../services'
import {
	saveProfileError,
	saveProfileSuccess,
	startLocalLoading
} from '../../../store/profile/actions'

export function saveChanges(changes, nextPage) {
	return async dispatch => {
		try {
			dispatch(startLocalLoading())
			await api.updateProfile(changes)
			dispatch(saveProfileSuccess(changes))
			navigationService.navigate(nextPage)
		} catch (error) {
			dispatch(saveProfileError(getErrorDataFromNetworkException(error)))
		}
	}
}

export function uploadAvatar(source, nextPage) {
	return async dispatch => {
		try {
			dispatch(startLocalLoading())
			if (source) {
				await api.uploadAvatar(source)
			}
			dispatch(saveProfileSuccess({ avatar: source }))
			navigationService.navigate(nextPage)
		} catch (error) {
			dispatch(saveProfileError(getErrorDataFromNetworkException(error)))
		}
	}
}

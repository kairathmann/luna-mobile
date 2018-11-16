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
			// TODO: Show global loader
			dispatch(startLocalLoading())
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

export function uploadAvatar(source, nextPage) {
	return async dispatch => {
		try {
			// TODO: Show global loader
			dispatch(startLocalLoading())
			if (source) {
				// TODO: Change to smartcrop or introduce better mechanism
				const {
					data: { guid, viewerHid }
				} = await api.stashAvatar(source)
				await api.cropAvatar({
					target_hid: viewerHid,
					stash_guid: guid,
					x1: 0,
					y1: 0,
					x2: 1000,
					y2: 1000
				})
			}
			dispatch(saveProfileSuccess({ avatar: source }))
			navigationService.navigate(nextPage)
		} catch (error) {
			dispatch(saveProfileError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

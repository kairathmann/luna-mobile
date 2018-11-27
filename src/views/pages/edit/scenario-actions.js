import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService, toastService } from '../../../services'
import {
	finishUpdatingProfile,
	saveProfileError,
	saveProfileSuccess,
	startLocalLoading
} from '../../../store/profile/actions'

export function uploadChanges(changes, avatar) {
	return async dispatch => {
		try {
			let profileToSave = { ...changes }
			dispatch(startLocalLoading())
			await api.updateProfile(changes)
			if (avatar) {
				const {
					data: { guid, viewerHid }
				} = await api.stashAvatar(avatar.uri)
				await api.cropAvatar({
					target_hid: viewerHid,
					stash_guid: guid,
					x1: 0,
					y1: 0,
					x2: 1000,
					y2: 1000
				})
				profileToSave = {
					...profileToSave,
					avatarUrl: avatar.uri,
					localAvatar: true
				}
			}
			dispatch(saveProfileSuccess(profileToSave))
			dispatch(finishUpdatingProfile())
			navigationService.navigate(PAGES_NAMES.PROFILE)
		} catch (error) {
			const errorMessage = getErrorDataFromNetworkException(error)
			toastService.showErrorToast(errorMessage, 'top')
			dispatch(saveProfileError(errorMessage))
		}
	}
}
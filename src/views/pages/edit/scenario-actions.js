// import {navigationService } from '../../../services'
import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import {
	finishUpdatingProfile,
	saveProfileError,
	saveProfileSuccess,
	startLocalLoading
} from '../../../store/profile/actions'

export function uploadChanges(changes, avatar) {
	return async dispatch => {
		try {
			let profileToSave = { ...changes, localAvatar: false }
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
					avatar: avatar.uri,
					localAvatar: true
				}
			}
			dispatch(saveProfileSuccess(profileToSave))
			dispatch(finishUpdatingProfile())
			navigationService.navigate(PAGES_NAMES.PROFILE)
		} catch (error) {
			dispatch(saveProfileError(getErrorDataFromNetworkException(error)))
		} finally {
			// TODO: Hide global loader
		}
	}
}

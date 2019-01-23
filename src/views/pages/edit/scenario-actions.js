import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import {
	navigationService,
	recommendationsService,
	toastService
} from '../../../services'
import {
	finishUpdatingProfile,
	saveProfileError,
	saveProfileSuccess,
	startLocalLoading
} from '../../../store/profile/actions'
import {
	showActiveMatches,
	showSkippedMatches,
	doneFetchingRecommendationsSuccess
} from '../../../store/recommendations/actions'

export function uploadChanges(changes, avatar) {
	return async (dispatch, getState) => {
		try {
			let profileToSave = { ...changes }
			dispatch(startLocalLoading())
			await api.updateProfile(changes)
			if (avatar) {
				await api.uploadAvatar(avatar.uri)
				profileToSave = {
					...profileToSave,
					avatarUrl: avatar.uri,
					localAvatar: true
				}
			}
			const genderPreferencesChanged =
				getState().profile.profile.gidSeeking !== changes.gidSeeking
			const seekingAgeRangeChanged =
				getState().profile.profile.seekingAgeFrom !== changes.seekingAgeFrom ||
				getState().profile.profile.seekingAgeTo !== changes.seekingAgeTo
			if (genderPreferencesChanged || seekingAgeRangeChanged) {
				// When user switched gender preferences or age range, fetch active recommendations
				let recommendationsToShow = await recommendationsService.fetchRecommendations(
					false
				)
				let shouldShowSkipped = false
				// If even after changing the gender preferences, there are now new mathces
				// fetch skipped matches and use that
				if (recommendationsToShow.length === 0) {
					recommendationsToShow = await recommendationsService.fetchRecommendations(
						true
					)
					shouldShowSkipped = true
				}
				if (shouldShowSkipped) {
					dispatch(showSkippedMatches())
				} else {
					dispatch(showActiveMatches())
				}
				dispatch(doneFetchingRecommendationsSuccess(recommendationsToShow))
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

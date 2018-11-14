import api from '../../../api'
import {
	avatarRelativeUrlToFullPhotoUrl,
	getErrorDataFromNetworkException,
	rewriteUrlImageForDefault
} from '../../../common/utils'
import {
	startFetchingRecommendations,
	doneFetchingRecommendationsSuccess,
	doneFetchingRecommendationsError,
	doneUnmatchingRecommendationSuccess
} from '../../../store/recommendations/actions'
import { toastService } from '../../../services'

export const fetchRecommendations = () => async dispatch => {
	try {
		// TODO: Show global loader
		dispatch(startFetchingRecommendations())
		const response = await api.fetchRecommendations()
		// TODO: The People property can be empty! In that case we should show view to repeat matches
		const recommendations = response.data.data.people.map(person => {
			const avatarUrlToPhotoUrl = avatarRelativeUrlToFullPhotoUrl(
				person.avatarUrl
			)
			const photoUrlRewrittenToDefaultIfRequired = rewriteUrlImageForDefault(
				avatarUrlToPhotoUrl,
				person.gidIs
			)
			return {
				...person,
				avatarUrl: photoUrlRewrittenToDefaultIfRequired
			}
		})
		dispatch(doneFetchingRecommendationsSuccess(recommendations))
	} catch (err) {
		getErrorDataFromNetworkException(err)
		dispatch(doneFetchingRecommendationsError(err))
		// TODO: Better error handling
	} finally {
		// TODO: Hide global loader
	}
}

export const unmatch = userid => async dispatch => {
	try {
		// TODO: Show global loader
		await api.unmatch({ recipient_hid: userid })
		dispatch(doneUnmatchingRecommendationSuccess(userid))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		toastService.showErrorToast(errorMessage, 'top')
		// TODO: Better error handling
	} finally {
		// TODO: Hide global loader
	}
}

import api from '../../../api'
import {
	avatarRelativeUrlToFullPhotoUrl,
	getErrorDataFromNetworkException,
	rewriteUrlImageForDefault
} from '../../../common/utils'
import { toastService } from '../../../services'
import {
	doneFetchingRecommendationsError,
	doneFetchingRecommendationsSuccess,
	doneUnmatchingRecommendationSuccess,
	showSkippedMatches,
	startFetchingRecommendations
} from '../../../store/recommendations/actions'

const remapMatches = matches => {
	return matches.map(person => {
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
}

export const fetchRecommendations = () => async (dispatch, getState) => {
	try {
		dispatch(startFetchingRecommendations())
		const response = getState().recommendations.isShowingSkipped
			? await api.fetchSkipped()
			: await api.fetchRecommendations()
		const recommendations = remapMatches(response.data.data.people)
		dispatch(doneFetchingRecommendationsSuccess(recommendations))
	} catch (err) {
		getErrorDataFromNetworkException(err)
		dispatch(doneFetchingRecommendationsError(err))
	}
}

export const unmatch = userId => async (dispatch, getState) => {
	try {
		const isShowingSkippedMatches = getState().recommendations.isShowingSkipped
		if (!isShowingSkippedMatches) {
			await api.unmatch({ recipient_hid: userId })
		}
		await dispatch(doneUnmatchingRecommendationSuccess(userId))
		if (getState().recommendations.recommendations.length === 0) {
			const response = getState().recommendations.isShowingSkipped
				? await api.fetchSkipped()
				: await api.fetchRecommendations()
			const recommendations = remapMatches(response.data.data.people)
			dispatch(doneFetchingRecommendationsSuccess(recommendations))
		}
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		toastService.showErrorToast(errorMessage, 'top')
	}
}

export const switchToLoadingSkippedMatches = () => dispatch => {
	dispatch(showSkippedMatches())
}

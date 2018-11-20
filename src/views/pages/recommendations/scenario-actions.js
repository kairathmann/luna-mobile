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
	doneUnmatchingRecommendationSuccess,
	showSkippedMatches
} from '../../../store/recommendations/actions'
import { toastService } from '../../../services'

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
		// TODO: Show global loader
		dispatch(startFetchingRecommendations())
		const response = getState().recommendations.isShowingSkipped
			? await api.fetchSkipped()
			: await api.fetchRecommendations()
		const recommendations = remapMatches(response.data.data.people)
		dispatch(doneFetchingRecommendationsSuccess(recommendations))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(doneFetchingRecommendationsError(errorMessage))
		// TODO: Better error handling
	} finally {
		// TODO: Hide global loader
	}
}

export const unmatch = userid => async (dispatch, getState) => {
	try {
		const isShowingSkippedMatches = getState().recommendations.isShowingSkipped
		// TODO: Show global loader
		if (!isShowingSkippedMatches) {
			await api.unmatch({ recipient_hid: userid })
		}
		await dispatch(doneUnmatchingRecommendationSuccess(userid))
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
		// TODO: Better error handling
	} finally {
		// TODO: Hide global loader
	}
}

export const switchToLoadingSkippedMatches = () => dispatch => {
	dispatch(showSkippedMatches())
}

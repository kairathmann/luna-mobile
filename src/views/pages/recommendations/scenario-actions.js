import api from '../../../api'
import {
	avatarRelativeUrlToFullPhotoUrl,
	getErrorDataFromNetworkException,
	rewriteUrlImageForDefault
} from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { toastService } from '../../../services'
import * as navigationService from '../../../services/navigationService'
import {
	doneFetchingRecommendationsError,
	doneFetchingRecommendationsSuccess,
	doneUnmatchingRecommendation,
	doneUnmatchingRecommendationSuccess,
	showSkippedMatches,
	startFetchingRecommendations,
	startUnmatching
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
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(doneFetchingRecommendationsError(errorMessage))
	}
}

export const match = user => async () => {
	navigationService.navigate(PAGES_NAMES.BID_MESSAGE, { partner: user })
}

export const unmatch = userId => async (dispatch, getState) => {
	try {
		dispatch(startUnmatching())
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
	} finally {
		dispatch(doneUnmatchingRecommendation())
	}
}

export const switchToLoadingSkippedMatches = () => dispatch => {
	dispatch(showSkippedMatches())
}

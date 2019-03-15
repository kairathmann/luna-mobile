import api from '../../../api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { toastService } from '../../../services'
import * as navigationService from '../../../services/navigationService'
import {
	doneFetchingRecommendationsError,
	doneFetchingRecommendationsSuccess,
	doneUnmatchingRecommendation,
	doneUnmatchingRecommendationSuccess,
	showActiveMatches,
	showSkippedMatches,
	startFetchingRecommendations,
	startUnmatching
} from '../../../store/recommendations/actions'
import { recommendationsService } from '../../../services'

export const fetchSkippedRecommendations = () => async dispatch => {
	try {
		dispatch(startFetchingRecommendations())
		const recommendations = await recommendationsService.fetchRecommendations(
			true
		)
		dispatch(doneFetchingRecommendationsSuccess(recommendations))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(doneFetchingRecommendationsError(errorMessage))
	}
}

export const fetchRecommendationsWithFallbackToSkipped = () => async dispatch => {
	try {
		dispatch(startFetchingRecommendations())
		let recommendations = []
		let shouldShowSkipped = false
		// First try to get active recommendations
		recommendations = await recommendationsService.fetchRecommendations(false)
		// If there are no active recommendations then just fetch skipped
		if (recommendations.length === 0) {
			recommendations = await recommendationsService.fetchRecommendations(true)
			shouldShowSkipped = true
		}
		if (shouldShowSkipped) {
			dispatch(showSkippedMatches())
		} else {
			dispatch(showActiveMatches())
		}
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
			const recommendations = await recommendationsService.fetchRecommendations(
				isShowingSkippedMatches
			)
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

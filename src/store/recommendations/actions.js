import {
	LOAD_RECOMMENDATIONS_PROGRESS,
	LOAD_RECOMMENDATIONS_SUCCESS,
	LOAD_RECOMMENDATIONS_ERROR,
	UNMATCH_RECOMMENDATION_PROGRESS,
	UNMATCH_RECOMMENDATION_SUCCESS,
	UNMATCH_RECOMMENDATION_FINISH,
	SHOW_SKIPPED_RECOMMENDATIONS,
	CLEAR_DATA
} from './action-types'

export const startFetchingRecommendations = () => ({
	type: LOAD_RECOMMENDATIONS_PROGRESS
})

export const doneFetchingRecommendationsSuccess = recommendations => ({
	type: LOAD_RECOMMENDATIONS_SUCCESS,
	payload: recommendations
})

export const doneFetchingRecommendationsError = errorMessage => ({
	type: LOAD_RECOMMENDATIONS_ERROR,
	payload: errorMessage
})

export const startUnmatching = () => ({
	type: UNMATCH_RECOMMENDATION_PROGRESS
})

export const doneUnmatchingRecommendationSuccess = idOfUserBeingUnmatched => ({
	type: UNMATCH_RECOMMENDATION_SUCCESS,
	payload: idOfUserBeingUnmatched
})

export const doneUnmatchingRecommendation = () => ({
	type: UNMATCH_RECOMMENDATION_FINISH
})

export const showSkippedMatches = () => ({
	type: SHOW_SKIPPED_RECOMMENDATIONS
})

export const clearData = () => ({
	type: CLEAR_DATA
})

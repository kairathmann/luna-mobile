import {
	LOAD_RECOMMENDATIONS_PROGRESS,
	LOAD_RECOMMENDATIONS_SUCCESS,
	LOAD_RECOMMENDATIONS_ERROR,
	NEXT_RECOMMENDATION,
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

export const showNextRecommendation = () => ({
	type: NEXT_RECOMMENDATION
})

export const clearData = () => ({
	type: CLEAR_DATA
})

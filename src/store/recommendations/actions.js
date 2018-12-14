import {
	LOAD_RECOMMENDATIONS_PROGRESS,
	LOAD_RECOMMENDATIONS_SUCCESS,
	LOAD_RECOMMENDATIONS_ERROR,
	UNMATCH_RECOMMENDATION_PROGRESS,
	UNMATCH_RECOMMENDATION_SUCCESS,
	UNMATCH_RECOMMENDATION_FINISH,
	SHOW_SKIPPED_RECOMMENDATIONS,
	SHOW_ACTIVE_RECOMMENDATIONS,
	CLEAR_DATA,
	MATCH_RECOMMENDATION_PROGRESS,
	MATCH_RECOMMENDATION_SUCCESS,
	MATCH_RECOMMENDATION_FINISH
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

export const startMatching = () => ({
	type: MATCH_RECOMMENDATION_PROGRESS
})

export const doneMatchingRecommendationSuccess = idOfUserBeingMatched => ({
	type: MATCH_RECOMMENDATION_SUCCESS,
	payload: idOfUserBeingMatched
})

export const doneMatchingRecommendation = () => ({
	type: MATCH_RECOMMENDATION_FINISH
})

export const showSkippedMatches = () => ({
	type: SHOW_SKIPPED_RECOMMENDATIONS
})

export const showActiveMatches = () => ({
	type: SHOW_ACTIVE_RECOMMENDATIONS
})

export const clearData = () => ({
	type: CLEAR_DATA
})

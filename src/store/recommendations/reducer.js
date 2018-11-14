import {
	LOAD_RECOMMENDATIONS_PROGRESS,
	LOAD_RECOMMENDATIONS_SUCCESS,
	LOAD_RECOMMENDATIONS_ERROR,
	UNMATCH_RECOMMENDATION_SUCCESS,
	CLEAR_DATA
} from './action-types'

const initialState = {
	recommendations: [],
	isLoading: false,
	isFetchingRecommendationsError: false,
	errorMessage: ''
}

export function recommendationsReducer(
	state = initialState,
	{ payload, type }
) {
	switch (type) {
		case LOAD_RECOMMENDATIONS_PROGRESS:
			return {
				...state,
				isLoading: true,
				isFetchingRecommendationsError: false,
				isUnmatchingRecommendationError: false,
				errorMessage: ''
			}
		case LOAD_RECOMMENDATIONS_SUCCESS:
			return {
				...state,
				isLoading: false,
				recommendations: payload
			}
		case LOAD_RECOMMENDATIONS_ERROR:
			return {
				...state,
				isLoading: false,
				isFetchingRecommendationsError: true,
				errorMessage: payload.errorMessage,
				recommendations: []
			}
		case UNMATCH_RECOMMENDATION_SUCCESS:
			return {
				...state,
				recommendations: state.recommendations.filter(
					person => person.hid !== payload
				)
			}
		case CLEAR_DATA:
			return {
				initialState
			}
		default:
			return state
	}
}

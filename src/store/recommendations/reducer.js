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

const initialState = {
	recommendations: [],
	isLoading: false,
	isFetchingRecommendationsError: false,
	errorMessage: '',
	isShowingSkipped: false
}

export function recommendationsReducer(
	state = initialState,
	{ payload, type }
) {
	switch (type) {
		case CLEAR_DATA:
			return initialState
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
		case UNMATCH_RECOMMENDATION_PROGRESS:
			return {
				...state,
				isLoading: true
			}
		case UNMATCH_RECOMMENDATION_SUCCESS:
			return {
				...state,
				recommendations: state.recommendations.filter(
					person => person.hid !== payload
				)
			}
		case UNMATCH_RECOMMENDATION_FINISH:
			return {
				...state,
				isLoading: false
			}
		case SHOW_SKIPPED_RECOMMENDATIONS:
			return {
				...state,
				isShowingSkipped: true
			}
		default:
			return state
	}
}

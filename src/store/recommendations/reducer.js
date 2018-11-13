import {
	LOAD_RECOMMENDATIONS_PROGRESS,
	LOAD_RECOMMENDATIONS_SUCCESS,
	LOAD_RECOMMENDATIONS_ERROR,
	NEXT_RECOMMENDATION,
	CLEAR_DATA
} from './action-types'

const initialState = {
	recommendations: [],
	isLoading: false,
	isError: false,
	errorMessage: '',
	currentlyRenderRecommendation: null,
	currentlyRenderRecommendationIndex: 0
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
				isError: false,
				errorMessage: ''
			}
		case LOAD_RECOMMENDATIONS_SUCCESS:
			return {
				...state,
				isLoading: false,
				recommendations: payload,
				currentlyRenderRecommendationIndex:
					payload.length > 0 ? 0 : state.currentlyRenderRecommendationIndex,
				currentlyRenderRecommendation:
					payload.length > 0 ? payload[0] : state.currentlyRenderRecommendation
			}
		case LOAD_RECOMMENDATIONS_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: payload.errorMessage,
				recommendations: []
			}
		case NEXT_RECOMMENDATION:
			return {
				...state,
				currentlyRenderRecommendationIndex:
					state.currentlyRenderRecommendationIndex ===
					state.recommendations.length - 1
						? state.recommendations.length - 1
						: state.currentlyRenderRecommendationIndex++,
				currentlyRenderRecommendation:
					state.recommendations[state.currentlyRenderRecommendationIndex]
			}
		case CLEAR_DATA:
			return {
				initialState
			}
		default:
			return state
	}
}

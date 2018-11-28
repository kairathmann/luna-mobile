import { CLEAR_DATA, SET_LOADING, UNSET_LOADING } from './action-types'

const initialState = {
	isLoading: false
}

export function globalReducer(state = initialState, action) {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				isLoading: true
			}
		case UNSET_LOADING:
			return {
				...state,
				isLoading: false
			}
		case CLEAR_DATA:
			return initialState
		default:
			return state
	}
}

import {
	LOAD_CONVERSATIONS_PROGRESS,
	LOAD_CONVERSATIONS_SUCCESS,
	LOAD_CONVERSATIONS_ERROR,
	CLEAR_DATA
} from './action-types'

const initialState = {
	conversations: [],
	isLoading: false,
	loadingConversationsErrorMessage: ''
}

export function conversationsReducer(state = initialState, { payload, type }) {
	switch (type) {
		case LOAD_CONVERSATIONS_PROGRESS:
			return {
				...state,
				isLoading: true,
				loadingConversationsErrorMessage: ''
			}
		case LOAD_CONVERSATIONS_SUCCESS:
			return {
				...state,
				isLoading: false,
				loadingConversationsErrorMessage: '',
				conversations: payload
			}
		case LOAD_CONVERSATIONS_ERROR:
			return {
				...state,
				isLoading: false,
				loadingConversationsErrorMessage: payload
			}
		case CLEAR_DATA:
			return {
				initialState
			}
		default:
			return state
	}
}

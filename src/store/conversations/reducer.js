import {
	LOAD_CONVERSATIONS_PROGRESS,
	LOAD_CONVERSATIONS_SUCCESS,
	LOAD_CONVERSATIONS_ERROR,
	LOAD_MESSAGES_ERROR,
	LOAD_MESSAGES_PROGRESS,
	LOAD_MESSAGES_SUCCESS,
	CLEAR_DATA
} from './action-types'

const initialState = {
	conversations: [],
	isLoading: false,
	isFetchingConversationsError: false,
	loadingConversationsErrorMessage: '',
	currentConversation: {
		messages: [],
		error: '',
		isLoading: false
	}
}

export function conversationsReducer(state = initialState, { payload, type }) {
	switch (type) {
		case LOAD_CONVERSATIONS_PROGRESS:
			return {
				...state,
				isLoading: true,
				isFetchingConversationsError: false,
				loadingConversationsErrorMessage: ''
			}
		case LOAD_CONVERSATIONS_SUCCESS:
			return {
				...state,
				isLoading: false,
				isFetchingConversationsError: false,
				loadingConversationsErrorMessage: '',
				conversations: payload
			}
		case LOAD_CONVERSATIONS_ERROR:
			return {
				...state,
				isLoading: false,
				isFetchingConversationsError: true,
				loadingConversationsErrorMessage: payload
			}
		case LOAD_MESSAGES_PROGRESS:
			return {
				...state,
				currentConversation: {
					...state.currentConversation,
					isLoading: true,
					error: ''
				}
			}
		case LOAD_MESSAGES_SUCCESS:
			return {
				...state,
				currentConversation: {
					isLoading: false,
					messages: payload,
					error: ''
				}
			}
		case LOAD_MESSAGES_ERROR:
			return {
				...state,
				currentConversation: {
					...state.currentConversation,
					isLoading: false,
					error: ''
				}
			}
		case CLEAR_DATA:
			return initialState
		default:
			return state
	}
}

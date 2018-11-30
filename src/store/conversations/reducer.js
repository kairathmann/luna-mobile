import {
	LOAD_CONVERSATIONS_PROGRESS,
	LOAD_CONVERSATIONS_SUCCESS,
	LOAD_CONVERSATIONS_ERROR,
	LOAD_MESSAGES_ERROR,
	LOAD_MESSAGES_PROGRESS,
	LOAD_MESSAGES_SUCCESS,
	APPEND_LOCAL_MESSAGE,
	SEND_MESSAGE_ERROR,
	SEND_MESSAGE_SUCCESS,
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
		case APPEND_LOCAL_MESSAGE:
			return {
				...state,
				currentConversation: {
					...state.currentConversation,
					messages: [
						...state.currentConversation.messages,
						{ ...payload, state: 'LOADING' }
					]
				}
			}
		case SEND_MESSAGE_SUCCESS:
			return {
				...state,
				currentConversation: {
					...state.currentConversation,
					messages: state.currentConversation.messages.map(mes => {
						if (mes.state === 'LOADING') {
							return {
								...mes,
								state: '',
								error: ''
							}
						}
						return mes
					})
				}
			}
		case SEND_MESSAGE_ERROR:
			return {
				...state,
				currentConversation: {
					...state.currentConversation,
					messages: state.currentConversation.messages.map(mes => {
						if (mes.id === payload.id) {
							return {
								...mes,
								error: payload.error
							}
						}
						return mes
					})
				}
			}
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

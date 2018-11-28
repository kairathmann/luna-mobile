import {
	LOAD_CONVERSATIONS_PROGRESS,
	LOAD_CONVERSATIONS_SUCCESS,
	LOAD_CONVERSATIONS_ERROR,
	CLEAR_DATA
} from './action-types'

export const startFetchingConversations = () => ({
	type: LOAD_CONVERSATIONS_PROGRESS
})

export const doneFetchingConversationsSuccess = conversations => ({
	type: LOAD_CONVERSATIONS_SUCCESS,
	payload: conversations
})

export const doneFetchingConversationsError = errorMessage => ({
	type: LOAD_CONVERSATIONS_ERROR,
	payload: errorMessage
})

export const clearData = () => ({
	type: CLEAR_DATA
})

import {
	APPEND_LOCAL_MESSAGE,
	CLEAR_DATA,
	LOAD_CONVERSATIONS_ERROR,
	LOAD_CONVERSATIONS_PROGRESS,
	LOAD_CONVERSATIONS_SUCCESS,
	LOAD_MESSAGES_ERROR,
	LOAD_MESSAGES_PROGRESS,
	LOAD_MESSAGES_SUCCESS,
	READ_CONVERSATION,
	SEND_MESSAGE_ERROR,
	SEND_MESSAGE_SUCCESS,
	UPDATE_MESSAGES
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

export const startFetchingMessages = () => ({
	type: LOAD_MESSAGES_PROGRESS
})

export const setConversationAsRead = conversationId => ({
	type: READ_CONVERSATION,
	payload: conversationId
})
export const doneFetchingMessagesSuccess = data => ({
	type: LOAD_MESSAGES_SUCCESS,
	payload: data
})

export const doneFetchingMessagesError = errorMessage => ({
	type: LOAD_MESSAGES_ERROR,
	payload: errorMessage
})

export const appendLocalMessage = text => ({
	type: APPEND_LOCAL_MESSAGE,
	payload: text
})

export const sendMessageSuccess = result => ({
	type: SEND_MESSAGE_SUCCESS,
	payload: result
})

export const sendMessageError = (error, id) => ({
	type: SEND_MESSAGE_ERROR,
	payload: {
		error,
		id
	}
})

export const updateMessagesWithNewData = newMessages => ({
	type: UPDATE_MESSAGES,
	payload: newMessages
})

export const clearData = () => ({
	type: CLEAR_DATA
})

import api from '../../../api/api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import {
	appendLocalMessage,
	doneFetchingMessagesError,
	doneFetchingMessagesSuccess,
	sendMessageError,
	sendMessageSuccess,
	setConversationAsRead,
	startFetchingMessages
} from '../../../store/conversations/actions'

export const fetchMessages = (hid, conversation) => async dispatch => {
	try {
		dispatch(startFetchingMessages())
		const messages = await api.fetchMessages({
			target_hid: hid,
			conversation_id: conversation.id
		})
		dispatch(setConversationAsRead(conversation.id))
		dispatch(doneFetchingMessagesSuccess(messages.data.data))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(doneFetchingMessagesError(errorMessage))
	}
}

export const resendMessage = (conversation, message) => async dispatch => {
	try {
		await api.sendMessage({
			recipient_hid: conversation.partnerHid,
			body: message.body
		})
		dispatch(sendMessageSuccess(message.id))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(sendMessageError(errorMessage, message.id))
	}
}

export const sendMessage = (conversation, text) => async (
	dispatch,
	getState
) => {
	const uniqueId = new Date().getTime()
	try {
		dispatch(
			appendLocalMessage({
				isNew: true, // used to distinguish messages that has been locally append to list from those recieved from server
				id: uniqueId,
				body: text,
				sentTime: new Date().toISOString(),
				senderHid: getState().profile.profile.targetHid,
				senderGender: getState().profile.profile.gidIs,
				senderAvatar: getState().profile.profile.avatarUrl
			})
		)
		await api.sendMessage({
			recipient_hid: conversation.partnerHid,
			body: text
		})
		dispatch(sendMessageSuccess(uniqueId))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(sendMessageError(errorMessage, uniqueId))
	}
}

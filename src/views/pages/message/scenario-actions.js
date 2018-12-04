import api from '../../../api/api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import {
	appendLocalMessage,
	doneFetchingMessagesError,
	doneFetchingMessagesSuccess,
	sendMessageError,
	sendMessageSuccess,
	startFetchingMessages
} from '../../../store/conversations/actions'

export const fetchMessages = (hid, conversation) => async dispatch => {
	try {
		dispatch(startFetchingMessages())
		const messages = await api.fetchMessages({
			target_hid: hid,
			conversation_id: conversation.id
		})
		dispatch(doneFetchingMessagesSuccess(messages.data.data.messages))
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
				id: uniqueId,
				body: text,
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

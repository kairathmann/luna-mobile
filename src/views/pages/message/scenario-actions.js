import api from '../../../api/api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { MESSAGE_TYPE } from '../../../enums'
import {
	appendLocalMessage,
	doneFetchingMessagesError,
	doneFetchingMessagesSuccess,
	sendMessageError,
	sendMessageSuccess,
	setConversationAsRead,
	startFetchingMessages,
	updateMessagesWithNewData
} from '../../../store/conversations/actions'

function extractKey(url) {
	const splitted = url.split('/')
	const keyWithParams = splitted.splice(3).join('/')
	return keyWithParams.split('?')[0]
}

export const fetchMessages = (hid, conversation) => async dispatch => {
	try {
		dispatch(startFetchingMessages())
		const messages = await api.fetchMessages({
			target_hid: hid,
			conversation_id: conversation.id
		})
		const conversationData = messages.data.data.conversation
		const remapedMessages = messages.data.data.messages.map(singleMessage => ({
			...singleMessage,
			visible: false
		}))
		dispatch(setConversationAsRead(conversation.id))
		dispatch(
			doneFetchingMessagesSuccess({
				conversation: conversationData,
				messages: remapedMessages
			})
		)
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

export const sendBubble = (conversation, uri) => async (dispatch, getState) => {
	const uniqueId = new Date().getTime()
	try {
		dispatch(
			appendLocalMessage({
				id: uniqueId,
				body: uri,
				sentTime: new Date().toISOString(),
				senderHid: getState().profile.profile.targetHid,
				senderGender: getState().profile.profile.gidIs,
				senderAvatar: getState().profile.profile.avatarUrl,
				type: MESSAGE_TYPE.BUBBLE
			})
		)
		const response = await api.getPresignedUrl()
		const awsUploadUrl = response.data.data.presignedUrl
		await api.uploadVideo({ uri }, awsUploadUrl, () => {})
		await api.sendMessage({
			recipient_hid: conversation.partnerHid,
			body: extractKey(awsUploadUrl),
			type: MESSAGE_TYPE.BUBBLE
		})
		dispatch(sendMessageSuccess(uniqueId))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(sendMessageError(errorMessage, uniqueId))
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
				senderAvatar: getState().profile.profile.avatarUrl,
				type: MESSAGE_TYPE.STANDARD
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

export const updateMessages = newMessagesData => dispatch => {
	dispatch(updateMessagesWithNewData(newMessagesData))
}

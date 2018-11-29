import api from '../../../api/api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import {
	doneFetchingMessagesError,
	doneFetchingMessagesSuccess,
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

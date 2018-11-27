import { getErrorDataFromNetworkException } from '../../../common/utils'
import {
	startFetchingConversations,
	doneFetchingConversationsSuccess,
	doneFetchingConversationsError
} from '../../../store/conversations/actions'
import { conversationsService } from '../../../services'

export const fetchConversations = targetHid => async dispatch => {
	try {
		dispatch(startFetchingConversations())
		const conversations = await conversationsService.fetchConversations(
			targetHid
		)
		dispatch(doneFetchingConversationsSuccess(conversations))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(doneFetchingConversationsError(errorMessage))
	}
}

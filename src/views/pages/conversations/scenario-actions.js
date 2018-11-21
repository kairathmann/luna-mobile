import api from '../../../api'
import {
	avatarRelativeUrlToFullPhotoUrl,
	getErrorDataFromNetworkException,
	rewriteUrlImageForDefault
} from '../../../common/utils'
import {
	startFetchingConversations,
	doneFetchingConversationsSuccess,
	doneFetchingConversationsError
} from '../../../store/conversations/actions'

const remapConversations = conversations => {
	return conversations.map(conversation => {
		const [avatarSmall, avatarMedium] = [
			conversation.partnerAvatarSmall,
			conversation.partnerAvatarMedium
		].map(avatar => {
			const avatarUrlToPhotoUrl = avatarRelativeUrlToFullPhotoUrl(avatar)
			return rewriteUrlImageForDefault(
				avatarUrlToPhotoUrl,
				conversation.partnerGender
			)
		})
		return {
			...conversation,
			partnerAvatarSmall: avatarSmall,
			partnerAvatarMedium: avatarMedium
		}
	})
}

export const fetchConversations = targetHid => async dispatch => {
	try {
		// TODO: Show global loader
		dispatch(startFetchingConversations())
		const response = await api.fetchConversations({ target_hid: targetHid })
		const conversations = remapConversations(response.data.data.conversations)
		dispatch(doneFetchingConversationsSuccess(conversations))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(doneFetchingConversationsError(errorMessage))
		// TODO: Better error handling
	} finally {
		// TODO: Hide global loader or maybe not becasue we have the FlatList default loader when pull to refresh?
	}
}

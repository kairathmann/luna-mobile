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
import { toastService } from '../../../services'

const remapConversations = conversations => {
	return conversations.map(conversation => {
		const [avatarSmall, avatarMedium] = [
			conversation.personAvatarSmall,
			conversation.personAvatarMedium
		].map(avatar => {
			const avatarUrlToPhotoUrl = avatarRelativeUrlToFullPhotoUrl(avatar)
			return rewriteUrlImageForDefault(
				avatarUrlToPhotoUrl,
				conversation.partnerGender
			)
		})
		return {
			...conversation,
			personAvatarSmall: avatarSmall,
			personAvatarMedium: avatarMedium
		}
	})
}

export const fetchConversations = targetHid => async dispatch => {
	try {
		// TODO: Show global loader
		dispatch(startFetchingConversations())
		// REFACTOR AS SOON AS ANDRZEJS CHANGES WITH PROFILE LOADING ARE MERGED
		const response = api.fetchConversations({ targetHid: targetHid })
		const conversations = remapConversations(response.data.data.conversations)
		dispatch(doneFetchingConversationsSuccess(conversations))
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		dispatch(doneFetchingConversationsError(errorMessage))
		toastService.showErrorToast()
		// TODO: Better error handling
	} finally {
		// TODO: Hide global loader or maybe not becasue we have the FlatList default loader when pull to refresh?
	}
}

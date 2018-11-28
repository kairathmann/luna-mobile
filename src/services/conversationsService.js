import api from '../api'
import {
	avatarRelativeUrlToFullPhotoUrl,
	rewriteUrlImageForDefault
} from '../common/utils'

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

const fetchConversations = async targetHid => {
	const response = await api.fetchConversations({ target_hid: targetHid })
	return remapConversations(response.data.data.conversations)
}

export { fetchConversations }

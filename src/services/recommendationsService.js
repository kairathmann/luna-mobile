import api from '../api'
import {
	avatarRelativeUrlToFullPhotoUrl,
	rewriteUrlImageForDefault
} from '../common/utils'

const remapMatches = matches => {
	return matches.map(person => {
		const avatarUrlToPhotoUrl = avatarRelativeUrlToFullPhotoUrl(
			person.avatarUrl
		)
		const photoUrlRewrittenToDefaultIfRequired = rewriteUrlImageForDefault(
			avatarUrlToPhotoUrl,
			person.gidIs
		)
		return {
			...person,
			avatarUrl: photoUrlRewrittenToDefaultIfRequired
		}
	})
}

const fetchRecommendations = async skipped => {
	const response = skipped
		? await api.fetchSkipped()
		: await api.fetchRecommendations()
	return remapMatches(response.data.data.people)
}

export { fetchRecommendations }

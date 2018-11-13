import api from '../../../api'
import {
	avatarRelativeUrlToFullPhotoUrl,
	getErrorDataFromNetworkException,
	rewriteUrlImageForDefault
} from '../../../common/utils'
import {
	startFetchingRecommendations,
	doneFetchingRecommendationsSuccess,
	doneFetchingRecommendationsError
} from '../../../store/recommendations/actions'

export const fetchRecommendations = () => async dispatch => {
	try {
		// TODO: Show global loader
		dispatch(startFetchingRecommendations())
		const response = await api.fetchRecommendations()
		// TODO: The People property can be empty! In that case we should show view to repeat matches
		const recommendations = response.data.data.people.map(person => {
			const avatarUrlToPhotoUrl = avatarRelativeUrlToFullPhotoUrl(
				person.avatarUrl
			)
			const photoUrlRewrittenToDefaultIfRequired = rewriteUrlImageForDefault(
				avatarUrlToPhotoUrl
			)
			return {
				...person,
				avatarUrl: photoUrlRewrittenToDefaultIfRequired
			}
		})
		dispatch(doneFetchingRecommendationsSuccess(recommendations))
	} catch (err) {
		getErrorDataFromNetworkException(err)
		dispatch(doneFetchingRecommendationsError(err))
		// TODO: Better error handling
		console.log(err)
	} finally {
		// TODO: Hide global loader
	}
}

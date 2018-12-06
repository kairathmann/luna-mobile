import I18n from '../../../../locales/i18n'
import api from '../../../api'
import {
	avatarRelativeUrlToFullPhotoUrl,
	getErrorDataFromNetworkException,
	rewriteUrlImageForDefault
} from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import { toastService } from '../../../services'
import * as navigationService from '../../../services/navigationService'
import {
	doneFetchingRecommendationsSuccess,
	doneMatchingRecommendation,
	doneMatchingRecommendationSuccess,
	startMatching
} from '../../../store/recommendations/actions'

export const createMessage = ({ targetHid, partner, text }) => async (
	dispatch,
	getState
) => {
	try {
		dispatch(startMatching())
		await api.createConversation({
			body: text,
			recipient_hid: partner.hid,
			sender_hid: targetHid,
			bid_price: '0.0'
		})
		await dispatch(doneMatchingRecommendationSuccess(partner.hid))
		if (getState().recommendations.recommendations.length === 0) {
			const response = getState().recommendations.isShowingSkipped
				? await api.fetchSkipped()
				: await api.fetchRecommendations()
			const recommendations = remapMatches(response.data.data.people)
			dispatch(doneFetchingRecommendationsSuccess(recommendations))
		}
		navigationService.navigate(PAGES_NAMES.RECOMMENDATIONS_PAGE)
		toastService.showSuccessToast(I18n.t('bid_page.success'), 'top')
	} catch (err) {
		const errorMessage = getErrorDataFromNetworkException(err)
		toastService.showErrorToast(errorMessage, 'top')
	} finally {
		dispatch(doneMatchingRecommendation())
	}
}

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

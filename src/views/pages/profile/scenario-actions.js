import api from '../../../api/api'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import { logoutUser } from '../../../store/auth/actions'
import { clearData as clearRecommendations } from '../../../store/recommendations/actions'
import { clearData as clearProfile } from '../../../store/profile/actions'

export function logout() {
	return async dispatch => {
		try {
			navigationService.navigate(PAGES_NAMES.LOADER)
			await api.logout()
		} finally {
			setTimeout(() => {
				navigationService.navigate(PAGES_NAMES.WELCOME_PAGE)
				dispatch(clearRecommendations())
				dispatch(clearProfile())
				dispatch(logoutUser())
			}, 2500)
		}
	}
}

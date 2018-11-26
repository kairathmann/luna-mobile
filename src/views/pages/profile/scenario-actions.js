import api from '../../../api/api'
import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import { logoutUser } from '../../../store/auth/actions'
import { clearData as clearProfile } from '../../../store/profile/actions'
import { clearData as clearRecommendations } from '../../../store/recommendations/actions'
import { clearData as clearConversations } from '../../../store/conversations/actions'
import { conversationsListTimerService } from '../../../services'

export function logout() {
	return async dispatch => {
		try {
			navigationService.navigate(PAGES_NAMES.LOADER)
			conversationsListTimerService.stopTimer()
			await api.logout()
		} finally {
			navigationService.navigate(PAGES_NAMES.WELCOME_PAGE)
			dispatch(clearRecommendations())
			dispatch(clearConversations())
			dispatch(clearProfile())
			dispatch(logoutUser())
		}
	}
}

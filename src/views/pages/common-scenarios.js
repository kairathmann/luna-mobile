import api from '../../api/api'
import { PAGES_NAMES } from '../../navigation'
import * as conversationsListTimerService from '../../services/conversationsListTimerService'
import * as navigationService from '../../services/navigationService'
import { logoutUser } from '../../store/auth/actions'
import { clearData as clearConversations } from '../../store/conversations/actions'
import { clearData as clearProfile } from '../../store/profile/actions'
import { clearData as clearRecommendations } from '../../store/recommendations/actions'

export async function logoutScenario() {
	navigationService.navigate(PAGES_NAMES.LOADER)
	conversationsListTimerService.stopTimer()
	await api.logout()
}

export function clearStoreScenario(dispatch) {
	dispatch(clearRecommendations())
	dispatch(clearConversations())
	dispatch(clearProfile())
	dispatch(logoutUser())
}

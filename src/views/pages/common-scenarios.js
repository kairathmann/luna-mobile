import api from '../../api/api'
import * as conversationsListTimerService from '../../services/conversationsListTimerService'
import { logoutUser } from '../../store/auth/actions'
import { clearData as clearConversations } from '../../store/conversations/actions'
import { clearData as clearProfile } from '../../store/profile/actions'
import { clearData as clearRecommendations } from '../../store/recommendations/actions'
import { clearData as clearGlobal } from '../../store/global/actions'

export async function logoutScenario() {
	conversationsListTimerService.stopTimer()
	await api.logout()
}

export function clearStoreScenario(dispatch) {
	dispatch(clearRecommendations())
	dispatch(clearConversations())
	dispatch(clearProfile())
	dispatch(logoutUser())
	dispatch(clearGlobal())
}

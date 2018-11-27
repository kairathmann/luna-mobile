import { conversationsListTimerService } from '../../../../services'

export const startConversationsUpdateService = targetHid => dispatch =>
	conversationsListTimerService.initializeService(dispatch, targetHid)

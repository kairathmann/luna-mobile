import api from '../../../../api/api'
import { conversationsListTimerService } from '../../../../services'
import { fetchProfileSuccess } from '../../../../store/profile/actions'

export const allDoneStartup = () => async dispatch => {
	const profileResponse = await api.fetchSelf()
	const profileData = profileResponse.data.data
	dispatch(fetchProfileSuccess(profileData))
	conversationsListTimerService.initializeService(
		dispatch,
		profileData.targetHid
	)
}

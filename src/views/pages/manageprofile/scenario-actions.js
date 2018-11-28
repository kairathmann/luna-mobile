import api from '../../../api/api'
import { getErrorDataFromNetworkException } from '../../../common/utils'
import { PAGES_NAMES } from '../../../navigation'
import * as navigationService from '../../../services/navigationService'
import {
	changeProfileStatusFailed,
	changeProfileStatusSuccess,
	prepareToChangeProfileStatus,
	startChangeProfileStatus
} from '../../../store/profile/actions'
import { clearStoreScenario, logoutScenario } from '../common-scenarios'

export function deleteAccount({ reasons, comment, password }) {
	return async dispatch =>
		performChangeStatus(dispatch, 'delete', { reasons, comment, password })
}

export function disableAccount({ reasons, comment, password }) {
	return async dispatch =>
		performChangeStatus(dispatch, 'disable', { reasons, comment, password })
}

export function startManaging() {
	return prepareToChangeProfileStatus()
}

async function performChangeStatus(dispatch, state, data) {
	let statusChanged = false
	try {
		dispatch(startChangeProfileStatus())
		await api.manageProfileState(state, data)
		statusChanged = true
		dispatch(changeProfileStatusSuccess())
		await logoutScenario()
	} catch (error) {
		if (!statusChanged) {
			dispatch(
				changeProfileStatusFailed(getErrorDataFromNetworkException(error))
			)
		}
	} finally {
		if (statusChanged) {
			navigationService.navigate(PAGES_NAMES.WELCOME_PAGE)
			clearStoreScenario(dispatch)
		}
	}
}

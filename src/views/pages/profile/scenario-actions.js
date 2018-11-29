import { PAGES_NAMES } from '../../../navigation'
import { navigationService } from '../../../services'
import { startUpdatingProfile } from '../../../store/profile/actions'
import { globalActions } from '../../../store/global'
import { clearStoreScenario, logoutScenario } from '../common-scenarios'

export function startEditing() {
	return startUpdatingProfile()
}

export function logout() {
	return async dispatch => {
		try {
			dispatch(globalActions.setGlobalLoading())
			await logoutScenario()
		} finally {
			dispatch(globalActions.unsetGlobalLoading())
			navigationService.navigate(PAGES_NAMES.WELCOME_PAGE)
			clearStoreScenario(dispatch)
		}
	}
}

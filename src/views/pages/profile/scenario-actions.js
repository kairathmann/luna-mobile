// import {navigationService } from '../../../services'
import { startUpdatingProfile } from '../../../store/profile/actions'

export function startEditing() {
	return startUpdatingProfile()
}

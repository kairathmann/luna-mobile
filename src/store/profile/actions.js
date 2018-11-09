import {
	CANCEL_UPDATING_PROFILE,
	FINISH_UPDATING_PROFILE,
	START_UPDATING_PROFILE,
	SAVE_PROFILE_ERROR,
	SAVE_PROFILE_SUCCESS
} from './action-types'

export function startUpdatingProfile() {
	return {
		type: START_UPDATING_PROFILE
	}
}

export function finishUpdatingProfile() {
	return {
		type: FINISH_UPDATING_PROFILE
	}
}

export function cancelUpdatingProfile() {
	return {
		type: CANCEL_UPDATING_PROFILE
	}
}

export function saveProfileSuccess(changes) {
	return {
		type: SAVE_PROFILE_SUCCESS,
		payload: changes
	}
}

export function saveProfileError(error) {
	return {
		type: SAVE_PROFILE_ERROR,
		payload: error
	}
}

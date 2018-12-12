import {
	CANCEL_UPDATING_PROFILE,
	FINISH_UPDATING_PROFILE,
	START_UPDATING_PROFILE,
	SAVE_PROFILE_ERROR,
	SAVE_PROFILE_SUCCESS,
	PROFILE_START_LOCAL_LOADING,
	FETCH_PROFILE_SUCCESS,
	FETCH_PROFILE_ERROR,
	CLEAR_DATA,
	START_CHANGE_PROFILE_STATUS,
	CHANGE_PROFILE_STATUS_ERROR,
	CHANGE_PROFILE_STATUS_SUCCESS,
	PREPARE_TO_CHANGE_STATUS
} from './action-types'

export function startChangeProfileStatus() {
	return {
		type: START_CHANGE_PROFILE_STATUS
	}
}

export function prepareToChangeProfileStatus() {
	return {
		type: PREPARE_TO_CHANGE_STATUS
	}
}

export function changeProfileStatusFailed(error) {
	return {
		type: CHANGE_PROFILE_STATUS_ERROR,
		payload: error
	}
}

export function changeProfileStatusSuccess() {
	return {
		type: CHANGE_PROFILE_STATUS_SUCCESS
	}
}

export function fetchProfileSuccess(profile) {
	console.log(profile)
	return {
		type: FETCH_PROFILE_SUCCESS,
		payload: profile
	}
}

export function fetchProfileError(error) {
	return {
		type: FETCH_PROFILE_ERROR,
		payload: error
	}
}

export function startUpdatingProfile() {
	return {
		type: START_UPDATING_PROFILE
	}
}

export function startLocalLoading() {
	return {
		type: PROFILE_START_LOCAL_LOADING
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

export function clearData() {
	return {
		type: CLEAR_DATA
	}
}

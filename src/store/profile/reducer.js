import {
	CANCEL_UPDATING_PROFILE,
	FINISH_UPDATING_PROFILE,
	SAVE_PROFILE_ERROR,
	SAVE_PROFILE_SUCCESS,
	START_UPDATING_PROFILE
} from './action-types'

const initialState = {
	profile: {},
	profileToEdit: {},
	error: ''
}

export function profileReducer(state = initialState, { payload, type }) {
	switch (type) {
		case CANCEL_UPDATING_PROFILE:
			return {
				...state,
				profileToEdit: {}
			}
		case START_UPDATING_PROFILE: {
			return {
				...state,
				profileToEdit: state.profile
			}
		}
		case FINISH_UPDATING_PROFILE:
			return {
				...state,
				profile: state.profileToEdit,
				profileToEdit: {}
			}

		case SAVE_PROFILE_SUCCESS:
			return {
				...state,
				profileToEdit: {
					...state.profileToEdit,
					...payload
				}
			}

		case SAVE_PROFILE_ERROR:
			return {
				...state,
				error: payload
			}

		default:
			return state
	}
}

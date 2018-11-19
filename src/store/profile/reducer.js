import {
	CANCEL_UPDATING_PROFILE,
	FINISH_UPDATING_PROFILE,
	SAVE_PROFILE_ERROR,
	SAVE_PROFILE_SUCCESS,
	PROFILE_START_LOCAL_LOADING,
	START_UPDATING_PROFILE,
	FETCH_PROFILE_SUCCESS
} from './action-types'

const initialState = {
	profile: {},
	profileToEdit: {},
	error: '',
	isLoading: false
}

export function profileReducer(state = initialState, { payload, type }) {
	switch (type) {
		case FETCH_PROFILE_SUCCESS:
			return {
				...state,
				profile: payload
			}
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
				},
				isLoading: false
			}

		case SAVE_PROFILE_ERROR:
			return {
				...state,
				error: payload,
				isLoading: false
			}

		case PROFILE_START_LOCAL_LOADING:
			return {
				...state,
				isLoading: true,
				error: ''
			}

		default:
			return state
	}
}

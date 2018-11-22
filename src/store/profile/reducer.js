import {
	CANCEL_UPDATING_PROFILE,
	CHANGE_PROFILE_STATUS_ERROR,
	CHANGE_PROFILE_STATUS_SUCCESS,
	CLEAR_DATA,
	FETCH_PROFILE_SUCCESS,
	FINISH_UPDATING_PROFILE,
	PROFILE_START_LOCAL_LOADING,
	SAVE_PROFILE_ERROR,
	SAVE_PROFILE_SUCCESS,
	START_CHANGE_PROFILE_STATUS,
	START_UPDATING_PROFILE,
	PREPARE_TO_CHANGE_STATUS
} from './action-types'

const initialState = {
	profile: {},
	profileToEdit: {},
	error: '',
	isLoading: false,
	status: {
		isChanging: false,
		error: ''
	}
}

export function profileReducer(state = initialState, { payload, type }) {
	switch (type) {
		case CHANGE_PROFILE_STATUS_ERROR:
			return {
				...state,
				status: {
					isChanging: false,
					error: payload
				}
			}
		case CHANGE_PROFILE_STATUS_SUCCESS: {
			return {
				...state,
				status: {
					isChanging: false,
					error: ''
				}
			}
		}
		case START_CHANGE_PROFILE_STATUS: {
			return {
				...state,
				status: {
					isChanging: true,
					error: ''
				}
			}
		}
		case PREPARE_TO_CHANGE_STATUS: {
			return {
				...state,
				status: {
					isChanging: false,
					error: ''
				}
			}
		}
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
				profileToEdit: {
					firstName: state.profile.firstName,
					gidIs: state.profile.gidIs,
					gidSeeking: state.profile.gidSeeking,
					avatarUrl: state.profile.avatarUrl,
					birthDate: state.profile.birthDate,
					seekingAgeFrom: state.profile.seekingAgeFrom,
					seekingAgeTo: state.profile.seekingAgeTo,
					tagline: state.profile.tagline
					//TODO: Add more field mapping
				}
			}
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

		case FINISH_UPDATING_PROFILE:
			return {
				...state,
				profile: {
					...state.profile,
					firstName: state.profileToEdit.firstName,
					gidIs: state.profileToEdit.gidIs,
					gidSeeking: state.profileToEdit.gidSeeking,
					localAvatar: state.profileToEdit.localAvatar,
					tagline: state.profileToEdit.tagline
				},
				profileToEdit: {}
			}
		case CLEAR_DATA:
			return initialState
		default:
			return state
	}
}

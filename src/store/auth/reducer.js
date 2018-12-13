import {
	SIGNIN_SUCCESS,
	SIGNIN_ERROR,
	SIGNUP_ERROR,
	SIGNUP_SUCCESS,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_ERROR,
	CLEAR_SIGNIN_ERROR,
	CLEAR_SIGNUP_ERROR,
	CLEAR_RESET_PASSWORD_ERROR,
	CLEAR_DATA
} from './action-types'

const initialState = {
	authenticated: '',
	signInLastResult: '',
	signupError: '',
	signinError: '',
	resetPasswordError: ''
}

export function authReducer(state = initialState, { payload, type }) {
	switch (type) {
		case CLEAR_DATA:
			return initialState
		case SIGNUP_ERROR:
			return {
				...state,
				signupError: payload
			}
		case SIGNUP_SUCCESS: {
			return {
				...state,
				authenticated: true
			}
		}
		case SIGNIN_SUCCESS:
			return {
				...state,
				authenticated: true
			}
		case SIGNIN_ERROR:
			return {
				...state,
				signinError: payload
			}
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordError: ''
			}
		case RESET_PASSWORD_ERROR:
			return {
				...state,
				resetPasswordError: payload
			}
		case CLEAR_SIGNIN_ERROR:
			return {
				...state,
				signinError: ''
			}
		case CLEAR_SIGNUP_ERROR:
			return {
				...state,
				signupError: ''
			}
		case CLEAR_RESET_PASSWORD_ERROR:
			return {
				...state,
				resetPasswordError: ''
			}
		default:
			return state
	}
}

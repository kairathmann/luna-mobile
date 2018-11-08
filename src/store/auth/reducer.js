import {
	SIGNIN_SUCCESS,
	SIGNIN_ERROR,
	SIGNUP_ERROR,
	SIGNUP_SUCCESS
} from './action-types'

const initialState = {
	authenticated: '',
	signInLastResult: '',
	signupError: '',
	signinError: ''
}

export function authReducer(state = initialState, { payload, type }) {
	switch (type) {
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

		default:
			return state
	}
}

import {
	SIGN_IN_LOCAL_SUCCESS,
	SIGN_IN_LOCAL_ERROR,
	SIGNUP_ERROR,
	SIGNUP_SUCCESS
} from './action-types'

const initialState = {
	authenticated: '',
	signInLastResult: '',
	signupError: ''
}

export function authReducer(state = initialState, { payload, type }) {
	switch (type) {
		case SIGNUP_ERROR:
			console.log({ payload })
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
		case SIGN_IN_LOCAL_SUCCESS:
			return {
				...state,
				authenticated: true
			}

		case SIGN_IN_LOCAL_ERROR:
			return {
				...state,
				signInLastResult: payload
			}

		default:
			return state
	}
}

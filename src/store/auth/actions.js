import {
	SIGNIN_SUCCESS,
	SIGNIN_ERROR,
	SIGNUP_ERROR,
	SIGNUP_SUCCESS
} from './action-types'

export function signupError(error) {
	return {
		type: SIGNUP_ERROR,
		payload: error
	}
}

export function signupSuccess(result) {
	return {
		type: SIGNUP_SUCCESS,
		payload: result
	}
}

export function signinSuccess(result) {
	return {
		type: SIGNIN_SUCCESS,
		payload: result.data
	}
}

export function signinError(error) {
	return {
		type: SIGNIN_ERROR,
		payload: error
	}
}

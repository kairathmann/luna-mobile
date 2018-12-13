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

export function logoutUser() {
	return {
		type: CLEAR_DATA
	}
}

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

export const resetPasswordSuccess = () => ({
	type: RESET_PASSWORD_SUCCESS
})

export const resetPasswordError = error => ({
	type: RESET_PASSWORD_ERROR,
	payload: error
})

export const clearSignInError = () => ({
	type: CLEAR_SIGNIN_ERROR
})

export const clearSignUpError = () => ({
	type: CLEAR_SIGNUP_ERROR
})

export const clearResetPasswordError = () => ({
	type: CLEAR_RESET_PASSWORD_ERROR
})

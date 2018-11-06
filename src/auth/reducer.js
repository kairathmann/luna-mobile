import {
  SIGN_IN_LOCAL_SUCCESS,
  SIGN_IN_LOCAL_ERROR
} from './action-types'

const initialState = {
  authenticated: '',
  signInLastResult: ''
}

export function authReducer (state = initialState, { payload, type }) {
  switch (type) {
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

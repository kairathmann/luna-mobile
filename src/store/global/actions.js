import { CLEAR_DATA, SET_LOADING, UNSET_LOADING } from './action-types'

export const setGlobalLoading = () => ({
	type: SET_LOADING
})

export const unsetGlobalLoading = () => ({
	type: UNSET_LOADING
})

export const clearData = () => ({
	type: CLEAR_DATA
})

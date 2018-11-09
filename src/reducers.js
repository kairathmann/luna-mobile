import { combineReducers } from 'redux'
import { authReducer } from './store/auth'
import { profileReducer } from './store/profile'

export default combineReducers({
	auth: authReducer,
	profile: profileReducer
})

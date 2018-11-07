import { combineReducers } from 'redux'
import { authReducer } from './store/auth'

export default combineReducers({
	auth: authReducer
})

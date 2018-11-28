import { combineReducers } from 'redux'
import { authReducer } from './store/auth'
import { profileReducer } from './store/profile'
import { recommendationsReducer } from './store/recommendations'
import { conversationsReducer } from './store/conversations'

export default combineReducers({
	auth: authReducer,
	profile: profileReducer,
	recommendations: recommendationsReducer,
	conversations: conversationsReducer
})

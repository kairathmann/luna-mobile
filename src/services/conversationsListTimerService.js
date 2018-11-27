import Config from 'react-native-config'
import { fetchConversations } from './conversationsService'
import { doneFetchingConversationsSuccess } from '../store/conversations/actions'
let timerInstance = ''
let dispatchInstance = ''
let userTargetHid = ''
const UPDATE_INTERVAL_IN_MILISECONDS = Number(
	Config.APP_CONVERSATIONS_UPDATE_INTERVAL
)
process.env.NODE_ENV === 'development' ? 15000 : 60000

const initializeService = async (dispatch, userId) => {
	stopTimer()
	dispatchInstance = dispatch
	userTargetHid = userId
	try {
		const conversations = await fetchConversations(userTargetHid)
		dispatchInstance(doneFetchingConversationsSuccess(conversations))
		launchTimer()
	} catch {
		// if loading failed then don't set another timeout
		clearTimeout(timerInstance)
	}
}

const launchTimer = () => {
	if (dispatchInstance && userTargetHid) {
		timerInstance = setTimeout(async () => {
			try {
				const conversations = await fetchConversations(userTargetHid)
				dispatchInstance(doneFetchingConversationsSuccess(conversations))
				clearTimeout(timerInstance)
				launchTimer()
			} catch (err) {
				// if loading failed then don't set another timeout
				clearTimeout(timerInstance)
			}
		}, UPDATE_INTERVAL_IN_MILISECONDS)
	}
}

const stopTimer = () => {
	clearTimeout(timerInstance)
	dispatchInstance = null
	userTargetHid = ''
}

const resetTimer = () => {
	clearTimeout(timerInstance)
	launchTimer()
}

export { initializeService, launchTimer, resetTimer, stopTimer }

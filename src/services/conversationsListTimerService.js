import { fetchConversations } from './conversationsService'
import { doneFetchingConversationsSuccess } from '../store/conversations/actions'
let timerInstance = ''
let dispatchInstance = ''
let userTargetHid = ''
const UPDATE_INTERVAL_IN_MILISECONDS = 30000

const initializeService = (dispatch, userId) => {
	stopTimer()
	dispatchInstance = dispatch
	userTargetHid = userId
	launchTimer()
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

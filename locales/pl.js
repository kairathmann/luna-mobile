import { pl as conversations_page } from '../src/views/pages/conversations/locales'
import { pl as edit_page } from '../src/views/pages/edit/locales'
import { pl as flow_page } from '../src/views/pages/flow/locales'
import { pl as forgot_password_page } from '../src/views/pages/forgot-password/locales'
import { pl as login_page } from '../src/views/pages/login/locales'
import { pl as manage_page } from '../src/views/pages/manageprofile/locales'
import { pl as profile_page } from '../src/views/pages/profile/locales'
import { pl as recommendations_page } from '../src/views/pages/recommendations/locales'
import { pl as signup_page } from '../src/views/pages/signup/locales'
import { pl as welcome_page } from '../src/views/pages/welcome/locales'
import { pl as message_page } from '../src/views/pages/message/locales'
import { pl as bid_page } from '../src/views/pages/bid-message/locales'

export default {
	welcome_page,
	signup_page,
	login_page,
	forgot_password_page,
	flow_page,
	profile_page,
	manage_page,
	recommendations_page,
	conversations_page,
	edit_page,
	message_page,
	bid_page,
	common: {
		email: 'Email',
		errors: {
			email_in_use: '_PL_This email address is already taken',
			email_not_found: 'Given email does not exist',
			incorrect_request: 'Incorrect request',
			nonexistent_user: 'User does not exist',
			wrong_password: 'Provided password is not correct',
			server_error:
				'_PL_Something is wrong at our side. Please try again later.',
			not_authenticated: 'You are logged out',
			deleted_user: '_PL_There is no user like that',
			illegal_state: 'Your account is already disabled or deleted',
			send_message_failed: 'Send message failed. Tap message to send again.'
		},
		male: 'Male',
		female: 'Female',
		both: 'Both',
		other: 'Other',
		back: 'Back',
		logout: 'Logout',
		search_placeholder: 'Search...',
		message_placeholder: 'Type your message...'
	}
}

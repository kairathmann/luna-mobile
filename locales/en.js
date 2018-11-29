import { en as conversations_page } from '../src/views/pages/conversations/locales'
import { en as edit_page } from '../src/views/pages/edit/locales'
import { en as flow_page } from '../src/views/pages/flow/locales'
import { en as forgot_password_page } from '../src/views/pages/forgot-password/locales'
import { en as login_page } from '../src/views/pages/login/locales'
import { en as manage_page } from '../src/views/pages/manageprofile/locales'
import { en as profile_page } from '../src/views/pages/profile/locales'
import { en as recommendations_page } from '../src/views/pages/recommendations/locales'
import { en as signup_page } from '../src/views/pages/signup/locales'
import { en as welcome_page } from '../src/views/pages/welcome/locales'

export default {
	welcome_page,
	signup_page,
	login_page,
	forgot_password_page,
	flow_page,
	profile_page,
	recommendations_page,
	conversations_page,
	edit_page,
	manage_page,
	common: {
		email: 'Email',
		errors: {
			email_in_use: 'This email address is already taken',
			email_not_found: 'Given email does not exist',
			incorrect_request: 'Incorrect request',
			nonexistent_user: 'User does not exist',
			wrong_password: 'Provided password is not correct',
			server_error: 'Something is wrong at our side. Please try again later.',
			not_authenticated: 'You are logged out',
			deleted_user: 'There is no user like that',
			illegal_state: 'Your account is already disabled or deleted'
		},
		male: 'Male',
		female: 'Female',
		both: 'Both',
		other: 'Other',
		back: 'Back',
		logout: 'Logout',
		search_placeholder: 'Search...'
	}
}

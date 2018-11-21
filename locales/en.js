import { en as welcome_page } from '../src/views/pages/welcome/locales'
import { en as signup_page } from '../src/views/pages/signup/locales'
import { en as login_page } from '../src/views/pages/login/locales'
import { en as flow_page } from '../src/views/pages/flow/locales'
import { en as recommendations_page } from '../src/views/pages/recommendations/locales'
import { en as conversations_page } from '../src/views/pages/conversations/locales'

export default {
	welcome_page,
	signup_page,
	login_page,
	flow_page,
	recommendations_page,
	conversations_page,
	common: {
		email: 'Email',
		errors: {
			email_in_use: 'This email address is already taken',
			incorrect_request: 'Incorrect request',
			nonexistent_user: 'User does not exist',
			wrong_password: 'Provided password is not correct',
			server_error: 'Something is wrong at our side. Please try again later.',
			not_authenticated: 'You are logged out'
		},
		male: 'Male',
		female: 'Female',
		both: 'Both',
		other: 'Other',
		back: 'Back'
	}
}

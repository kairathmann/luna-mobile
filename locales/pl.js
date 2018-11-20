import { pl as welcome_page } from '../src/views/pages/welcome/locales'
import { pl as signup_page } from '../src/views/pages/signup/locales'
import { pl as login_page } from '../src/views/pages/login/locales'
import { pl as flow_page } from '../src/views/pages/flow/locales'
import { pl as profile_page } from '../src/views/pages/profile/locales'
import { pl as recommendations_page } from '../src/views/pages/recommendations/locales'

export default {
	welcome_page,
	signup_page,
	login_page,
	flow_page,
	profile_page,
	recommendations_page,
	common: {
		email: 'Email',
		errors: {
			email_in_use: '_PL_This email address is already taken',
			incorrect_request: 'Incorrect request',
			nonexistent_user: 'User does not exist',
			wrong_password: 'Provided password is not correct',
			server_error:
				'_PL_Something is wrong at our side. Please try again later.',
			not_authenticated: 'You are logged out'
		},
		male: 'Male',
		female: 'Female',
		both: 'Both',
		other: 'Other',
		back: 'Back'
	}
}

import { de as welcome_page } from '../src/views/pages/welcome/locales'
import { de as signup_page } from '../src/views/pages/signup/locales'
import { de as login_page } from '../src/views/pages/login/locales'
import { de as forgot_password_page } from '../src/views/pages/forgot-password/locales'
import { de as flow_page } from '../src/views/pages/flow/locales'

import { de as profile_page } from '../src/views/pages/profile/locales'
import { de as edit_page } from '../src/views/pages/edit/locales'
import { de as recommendations_page } from '../src/views/pages/recommendations/locales'

export default {
	welcome_page,
	signup_page,
	login_page,
	forgot_password_page,
	flow_page,
	profile_page,
	recommendations_page,
	edit_page,
	common: {
		email: 'Email',
		errors: {
			email_in_use: 'This email address is already taken',
			email_not_found: 'Given email does not exist',
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
		back: 'Back',
		logout: 'Logout'
	}
}

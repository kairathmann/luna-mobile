import { en as welcome_page } from '../src/views/pages/welcome/locales'
import { en as signup_page } from '../src/views/pages/signup/locales'
import { en as login_page } from '../src/views/pages/login/locales'
import { en as flow_page } from '../src/views/pages/flow/locales'

export default {
	welcome_page,
	signup_page,
	login_page,
	flow_page,
	common: {
		email: 'Email',
		errors: {
			email_in_use: 'This email address is already taken',
			incorrect_request: 'Incorrect request',
			nonexistent_user: 'User does not exist',
			wrong_password: 'Provided password is not correct'
		},
		male: 'Male',
		female: 'Female',
		both: 'Both',
		other: 'Other',
		back: 'Back'
	}
}

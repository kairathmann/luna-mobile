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
import { en as message_page } from '../src/views/pages/message/locales'
import { en as bid_page } from '../src/views/pages/bid-message/locales'

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
	message_page,
	bid_page,
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
			illegal_state: 'Your account is already disabled or deleted',
			send_message_failed: 'Send message failed. Tap message to send again.',
			invalid_negative_balance: 'Your balance is negative',
			invalid_address: 'Invalid address',
			invalid_source_address: 'Invalid source address',
			invalid_dest_address: 'Invalid destination address',
			existing_inverse_reaction: `You've already skipped this person`,
			existing_positive_reaction: `You already matched this person`,
			resource_not_found: 'Unfortunately, not found.',
			no_internet_connection: 'Oops, you have no internet connection!',
			email_empty: 'Email is empty',
			email_invalid: 'Email is invalid',
			too_many_requests: 'Too many requests',
			login_required: 'You need to be logged in',
			access_denied: `You're not allowed`,
			request_throttled: 'Request was throttled',
			password_invalid: 'Password is invalid',
			email_exceeds_max_length: 'Email is too long',
			invalid_sender_hid: 'Wrong sender data',
			invalid_recipient_hid: 'Wrong receipient data',
			body_empty: 'Body cannot be empty',
			subject_empty: 'Subject cannot be empty',
			invalid_guid: 'Invalid image id',
			guid_not_string: 'Invalide image id',
			crop_coords_not_int: 'Crop coordinates needs to be integers',
			invalid_crop_coords: 'Invalid crop coordinates',
			invalid_aspect_ratio: 'Invalid aspect ratio',
			nonexistent_guid: 'That image does not exist',
			below_min_dimensions: 'Below min dimensions',
			image_key_not_in_files: 'Image key is missing',
			invalid_file_handle: 'Invalid file handle',
			resize_width_not_int: 'Width needs to be integer',
			invalid_resize_width: 'Invalid width value',
			resize_height_not_int: 'Height needs to be integer',
			invalid_resize_height: 'Invalid height value',
			invalid_filehandle: 'Invalid file handle',
			invalid_file_format: 'Invalid file format',
			malformed_email: 'This is not correct email format',
			malformed_password: 'This is not correct password',
			nonexistent_recipient: 'Receipient does not exist'
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

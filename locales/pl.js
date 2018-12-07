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
			email_not_found: '_PL_Given email does not exist',
			incorrect_request: '_PL_Incorrect request',
			nonexistent_user: '_PL_User does not exist',
			wrong_password: '_PL_Provided password is not correct',
			server_error:
				'_PL_Something is wrong at our side. Please try again later.',
			not_authenticated: '_PL_You are logged out',
			deleted_user: '_PL_There is no user like that',
			illegal_state: '_PL_Your account is already disabled or deleted',
			send_message_failed:
				'_PL_Send message failed. Tap message to send again.',
			invalid_negative_balance: '_PL_Your balance is negative',
			invalid_address: '_PL_Invalid address',
			invalid_source_address: '_PL_Invalid source address',
			invalid_dest_address: '_PL_Invalid destination address',
			existing_inverse_reaction: `You've already skipped this person`,
			existing_positive_reaction: `You already matched this person`,
			resource_not_found: '_PL_Unfortunately, not found.',
			no_internet_connection: '_PL_Oops, you have no internet connection!',
			email_empty: '_PL_Email is empty',
			email_invalid: '_PL_Email is invalid',
			too_many_requests: '_PL_Too many requests',
			login_required: '_PL_You need to be logged in',
			access_denied: `You're not allowed`,
			request_throttled: '_PL_Request was throttled',
			password_invalid: '_PL_Password is invalid',
			email_exceeds_max_length: '_PL_Email is too long',
			invalid_sender_hid: '_PL_Wrong sender data',
			invalid_recipient_hid: '_PL_Wrong receipient data',
			body_empty: '_PL_Body cannot be empty',
			subject_empty: '_PL_Subject cannot be empty',
			invalid_guid: '_PL_Invalid image id',
			guid_not_string: '_PL_Invalide image id',
			crop_coords_not_int: '_PL_Crop coordinates needs to be integers',
			invalid_crop_coords: '_PL_Invalid crop coordinates',
			invalid_aspect_ratio: '_PL_Invalid aspect ratio',
			nonexistent_guid: '_PL_That image does not exist',
			below_min_dimensions: '_PL_Below min dimensions',
			image_key_not_in_files: '_PL_Image key is missing',
			invalid_file_handle: '_PL_Invalid file handle',
			resize_width_not_int: '_PL_Width needs to be integer',
			invalid_resize_width: '_PL_Invalid width value',
			resize_height_not_int: '_PL_Height needs to be integer',
			invalid_resize_height: '_PL_Invalid height value',
			invalid_filehandle: '_PL_Invalid file handle',
			invalid_file_format: '_PL_Invalid file format',
			malformed_email: '_PL_This is not correct email format',
			malformed_password: '_PL_This is not correct password',
			nonexistent_recipient: '_PL_Receipient does not exist'
		},
		male: 'Male',
		female: 'Female',
		both: 'Everyone',
		other: 'Other',
		back: 'Back',
		logout: 'Logout',
		search_placeholder: 'Search...',
		message_placeholder: 'Type your message...'
	}
}

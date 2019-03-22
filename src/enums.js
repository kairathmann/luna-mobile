export const GENDER = {
	MALE: 1,
	FEMALE: 2,
	OTHER: 3,
	BOTH: 3
}

export const ORIENTATION = {
	PORTRAIT: 1,
	LANDSCAPE: 2
}

export const PROFILE_STATE = {
	INCOMPLETE: 1,
	ACTIVE: 2,
	DISABLED: 3,
	DELETED: 4
}

export const BID_STATUS = {
	BID_WINNING: 1,
	BID_LOSING: 2,
	BID_WON: 3,
	BID_LOST: 4,
	BID_ACCEPTED: 5,
	BID_TIMEOUT: 6
}

export const VIDEO_STATE = {
	INITIALIZING_MEDIA_PLAYER: 0,
	PAUSED: 1,
	PLAYING: 2,
	LOADING: 3,
	ERROR: 4
}

export const MESSAGE_TYPE = {
	BUBBLE: 'BUBBLE',
	STANDARD: 'STANDARD'
}

export const REASONS = [
	{
		slug: 'met_someone_here',
		index: 1
	},
	{
		slug: 'met_someone_elsewhere',
		index: 2
	},
	{
		slug: 'prefer_another_app',
		index: 3
	},
	{
		slug: 'no_people_around',
		index: 4
	},
	{
		slug: 'no_interesting_people',
		index: 5
	}
]

export const RECORDING_STATUSES = {
	WAITING: 0,
	RECORDING: 1,
	UPLOADING: 2,
	PERMISSIONS_MISSING: 3,
	ERROR: 4
}

export const CAMERA_STATUSES = {
	PENDING_AUTHORIZATION: 'PENDING_AUTHORIZATION',
	NOT_AUTHORIZED: 'NOT_AUTHORIZED',
	READY: 'READY'
}

export const MAX_VIDEO_DIMENSIONS = 512
export const MIN_VIDEO_DIMENSIONS = 128
export const VIDEO_BORDER_WIDTH = 5

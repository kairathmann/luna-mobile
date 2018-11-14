import { Toast } from 'native-base'

const showErrorToast = (message, position = 'bottom', duration = 5000) => {
	Toast.show({
		text: message,
		buttonText: 'OK',
		duration: duration,
		type: 'danger',
		position: position
	})
}

export { showErrorToast }

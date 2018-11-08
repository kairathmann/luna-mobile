import I18n from '../../locales/i18n'

const getErrorDataFromNetworkException = error => {
	let errorMessage = ''
	if (error.response) {
		if (error.response.status >= 500) {
			errorMessage = I18n.t('common.errors.server_error')
		} else {
			const errorCode = error.response.data.code
			switch (error.response.status) {
				case 400:
					errorMessage = I18n.t(
						`common.errors.${errorCode || 'incorrect_request'}`
					)
					break
				case 404:
					errorMessage = I18n.t('common.errors.resource_not_found')
					break
			}
		}
	} else if (error.request) {
		errorMessage = I18n.t('common.errors.no_internet_connection')
	} else {
		throw error
	}

	return errorMessage
}

export { getErrorDataFromNetworkException }

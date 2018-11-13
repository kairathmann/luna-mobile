import Config from 'react-native-config'
import I18n from '../../locales/i18n'
import { GENDER } from '../enums'
import DefaultFemale from '../assets/images/default_female.png'
import DefaultMale from '../assets/images/default_male.png'
import DefaultOther from '../assets/images/default_other.png'

const baseHostForURLs = Config.APP_URL_BASE

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

const avatarRelativeUrlToFullPhotoUrl = avatarUrl => {
	return `${baseHostForURLs}${avatarUrl}`
}

const rewriteUrlImageForDefault = (
	photoUrl = 'hydra/img/src/',
	gender = GENDER.OTHER
) => {
	if (photoUrl.includes('hydra/img/src/')) {
		switch (gender) {
			case GENDER.MALE:
				return 'default_male'
			case GENDER.FEMALE:
				return 'default_female'
			default:
				return 'default_other'
		}
	} else {
		return photoUrl
	}
}

const checkImageURL = (photoUrl = 'default_male') => {
	if (photoUrl.includes('default_male')) {
		return DefaultMale
	}
	if (photoUrl.includes('default_female')) {
		return DefaultFemale
	}
	if (photoUrl.includes('default_other')) {
		return DefaultOther
	}
	if (photoUrl.includes('default_both')) {
		return DefaultOther
	} else {
		return {
			uri: photoUrl
		}
	}
}

const getLoaderImageForGender = (gender = GENDER.OTHER) => {
	switch (gender) {
		case GENDER.MALE:
			return DefaultMale
		case GENDER.FEMALE:
			return DefaultFemale
		default:
			return DefaultOther
	}
}

export {
	avatarRelativeUrlToFullPhotoUrl,
	checkImageURL,
	getErrorDataFromNetworkException,
	getLoaderImageForGender,
	rewriteUrlImageForDefault
}

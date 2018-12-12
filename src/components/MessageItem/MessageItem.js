import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../locales/i18n'
import {
	avatarRelativeUrlToFullPhotoUrl,
	getLoaderImageForGender,
	getMomentCurrentLocaleWithFallback,
	isHydraImage
} from '../../common/utils'
import { styles as commonStyles } from '../../styles'
import { LUNA_MESSAGE_TEXT, LUNA_PRIMARY_COLOR } from '../../styles/colors'

function getAvatar(message) {
	return isHydraImage(message.senderAvatar)
		? getLoaderImageForGender(message.senderGender)
		: { uri: avatarRelativeUrlToFullPhotoUrl(message.senderAvatar) }
}

const BIG_RADIUS = 18
const SMALL_RADIUS = 4
const zoneOffset = new Date().getTimezoneOffset()

const MessageItem = ({ message, onResend }) => {
	const handleMessageTap = () => {
		if (message.error) {
			onResend(message)
		}
	}

	const getBorderRadius = () => {
		const recipientBorder = {
			borderTopLeftRadius: message.ownPrevious ? SMALL_RADIUS : BIG_RADIUS,
			borderBottomLeftRadius: message.ownNext ? SMALL_RADIUS : BIG_RADIUS,
			borderTopRightRadius: BIG_RADIUS,
			borderBottomRightRadius: BIG_RADIUS
		}
		const userBorder = {
			borderTopRightRadius: message.ownPrevious ? SMALL_RADIUS : BIG_RADIUS,
			borderBottomRightRadius: message.ownNext ? SMALL_RADIUS : BIG_RADIUS,
			borderTopLeftRadius: BIG_RADIUS,
			borderBottomLeftRadius: BIG_RADIUS
		}

		return message.isRecipient ? recipientBorder : userBorder
	}

	return (
		<View>
			{message.hasDivider && (
				<Text style={styles.divider}>
					{moment(message.sentTime)
						.locale(getMomentCurrentLocaleWithFallback())
						.subtract(zoneOffset)
						.format('ddd, HH:mm')}
				</Text>
			)}
			<View
				style={[
					{
						flexDirection: message.isRecipient ? 'row' : 'row-reverse',
						opacity: message.state === 'LOADING' || message.error ? 0.5 : 1,
						marginBottom: message.ownNext ? 1 : 4
					},
					styles.container
				]}
			>
				{message.isRecipient && (
					<View style={styles.imageContainer}>
						{message.showAvatar && (
							<Image style={styles.image} source={getAvatar(message)} />
						)}
					</View>
				)}
				<View
					style={[
						{
							backgroundColor: message.isRecipient
								? '#f1f0f0'
								: LUNA_PRIMARY_COLOR,
							...getBorderRadius()
						},
						styles.textContainer
					]}
				>
					<TouchableOpacity
						disabled={!message.error}
						onPress={handleMessageTap}
					>
						<Text
							style={{
								margin: 0,
								color: message.isRecipient ? LUNA_MESSAGE_TEXT : 'white'
							}}
						>
							{message.body}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			{message.error && message.error !== '' ? (
				<Text style={[commonStyles.errorText, { fontSize: 12 }]}>
					{I18n.t('common.errors.send_message_failed')}
				</Text>
			) : null}
		</View>
	)
}

const styles = EStyleSheet.create({
	container: {
		alignItems: 'flex-end'
	},
	divider: {
		fontSize: 12,
		textAlign: 'center',
		color: '#adadad',
		marginTop: 4,
		marginBottom: 4
	},
	imageContainer: {
		width: 36,
		height: 36,
		marginRight: 4,
		marginLeft: 4
	},
	image: {
		width: 36,
		height: 36,
		borderRadius: BIG_RADIUS
	},
	textContainer: {
		minHeight: 36,
		maxWidth: '66%',
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 8,
		paddingBottom: 8
	}
})

MessageItem.propTypes = {
	message: PropTypes.object.isRequired,
	onResend: PropTypes.func.isRequired
}

export default MessageItem

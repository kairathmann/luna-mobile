import PropTypes from 'prop-types'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../locales/i18n'
import {
	avatarRelativeUrlToFullPhotoUrl,
	getLoaderImageForGender,
	isHydraImage
} from '../../common/utils'
import { styles as commonStyles } from '../../styles'
import { LUNA_PRIMARY_COLOR } from '../../styles/colors'

function getAvatar(message) {
	return isHydraImage(message.senderAvatar)
		? getLoaderImageForGender(message.senderGender)
		: { uri: avatarRelativeUrlToFullPhotoUrl(message.senderAvatar) }
}

const MessageItem = ({ message, onResend }) => {
	const handleMessageTap = () => {
		if (message.error) {
			onResend(message)
		}
	}

	return (
		<View>
			<View
				style={[
					{
						flexDirection: message.isRecipient ? 'row' : 'row-reverse',
						opacity: message.state === 'LOADING' || message.error ? 0.5 : 1
					},
					styles.container
				]}
			>
				<Image style={styles.image} source={getAvatar(message)} />
				<View
					style={[
						{
							backgroundColor: message.isRecipient
								? '#f1f0f0'
								: LUNA_PRIMARY_COLOR
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
								color: message.isRecipient ? '#2a2a2a' : 'white'
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
		alignItems: 'flex-end',
		marginBottom: 4
	},
	image: {
		width: 36,
		height: 36,
		borderRadius: 18,
		marginRight: 4,
		marginLeft: 4
	},
	textContainer: {
		borderRadius: 18,
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

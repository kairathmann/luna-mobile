import PropTypes from 'prop-types'
import React from 'react'
import { Image, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { checkImageURL } from '../../common/utils'

export default function MessageAvatar({ conversation }) {
	return (
		<View style={styles.avatarContainer}>
			<Image
				style={styles.avatar}
				source={checkImageURL(conversation.partnerAvatarMedium)}
			/>
		</View>
	)
}

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#efefef'
	},
	avatarContainer: {
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar: {
		backgroundColor: '#888',
		borderRadius: 80,
		width: 160,
		height: 160
	}
})

MessageAvatar.propTypes = {
	conversation: PropTypes.object.isRequired
}

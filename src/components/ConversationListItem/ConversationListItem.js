import React from 'react'
import PropTypes from 'prop-types'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Image, Text, View } from 'react-native'
import { GENDER } from '../../enums'
import { checkImageURL } from '../../common/utils'

class ConversationListItem extends React.PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={checkImageURL(this.props.conversation.partnerAvatarSmall)}
					/>
				</View>
				<View style={styles.textContainer}>
					<View style={{ flexWrap: 'wrap' }}>
						<Text style={styles.textUsername}>
							{this.props.conversation.partnerName}
						</Text>
					</View>
					<View style={{ flexWrap: 'wrap' }}>
						<Text style={styles.textLastMessage}>
							{this.props.conversation.subject}
						</Text>
					</View>
				</View>
				<View style={styles.textLastUpdatedContainer}>
					<Text style={styles.textLastUpdated}>24 hours ago</Text>
				</View>
			</View>
		)
	}
}

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#e5e5e5',
		padding: '0.8rem'
	},
	imageContainer: {
		flexShrink: 3,
		borderRadius: '2rem',
		width: '4rem',
		height: '4rem'
	},
	image: {
		borderRadius: '2rem',
		width: '4rem',
		height: '4rem'
	},
	textContainer: {
		marginLeft: '0.8rem',
		flexGrow: 5.5,
		paddingTop: '0.2rem'
	},
	textUsername: {
		fontFamily: 'Lato-Regular',
		fontWeight: 'bold',
		fontSize: '0.8rem',
		color: 'black',
		marginBottom: '0.2rem'
	},
	textLastMessage: {
		fontFamily: 'Lato-Regular',
		fontSize: '0.7rem',
		color: '#4a4a4a'
	},
	textLastUpdatedContainer: {
		flex: 1.5,
		alignItems: 'flex-end',
		paddingTop: '0.2rem'
	},
	textLastUpdated: {
		fontFamily: 'Lato-Regular',
		fontWeight: '100',
		fontSize: '0.5rem',
		color: '#4a4a4a'
	}
})

ConversationListItem.propTypes = {
	conversation: PropTypes.shape({
		id: PropTypes.number.isRequired,
		lastMessageSenderHid: PropTypes.string.isRequired,
		lastUpdate: PropTypes.string.isRequired,
		partnerAvatarMedium: PropTypes.string.isRequired,
		partnerAvatarSmall: PropTypes.string.isRequired,
		partnerGender: PropTypes.oneOf([
			GENDER.BOTH,
			GENDER.FEMALE,
			GENDER.MALE,
			GENDER.OTHER
		]).isRequired,
		partnerHid: PropTypes.string.isRequired,
		partnerName: PropTypes.string.isRequired,
		pending: PropTypes.bool.isRequired,
		subject: PropTypes.string.isRequired
	}).isRequired
}

export default ConversationListItem

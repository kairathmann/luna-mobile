import React from 'react'
import PropTypes from 'prop-types'
import EStyleSheet from 'react-native-extended-stylesheet'
import Moment from 'react-moment'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import I18n from '../../../locales/i18n'
import {
	checkImageURL,
	getMomentCurrentLocaleWithFallback
} from '../../common/utils'
import { MESSAGE_TYPE } from '../../enums'

const zoneOffset = new Date().getTimezoneOffset()

class ConversationListItem extends React.PureComponent {
	render() {
		return (
			<TouchableOpacity onPress={this.props.onClick}>
				<View style={styles.container}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							source={checkImageURL(this.props.partnerAvatarSmall)}
						/>
						{this.props.pending && (
							<View style={styles.notificationCircleContainer}>
								<View style={styles.notificationCircle} />
							</View>
						)}
					</View>
					<View style={styles.textContainer}>
						<View style={{ flexWrap: 'wrap' }}>
							<Text style={styles.textUsername}>{this.props.partnerName}</Text>
						</View>
						<View style={{ flexWrap: 'wrap' }}>
							<Text
								numberOfLines={3}
								style={[
									styles.textLastMessage,
									this.props.subjectType === MESSAGE_TYPE.BUBBLE
										? styles.bubbleSubject
										: '',
									this.props.pending ? styles.textLastMessageUnread : ''
								]}
							>
								{this.props.subjectType == MESSAGE_TYPE.BUBBLE
									? I18n.t('conversations_page.bubble_message')
									: this.props.subject}
							</Text>
						</View>
					</View>
					<View style={styles.textLastUpdatedContainer}>
						<Moment
							style={styles.textLastUpdated}
							locale={getMomentCurrentLocaleWithFallback()}
							element={Text}
							fromNow
							subtract={{ minutes: zoneOffset }}
						>
							{this.props.lastUpdate}
						</Moment>
					</View>
				</View>
			</TouchableOpacity>
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
	notificationCircleContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: '-0.5rem',
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	notificationCircle: {
		position: 'absolute',
		right: 0,
		width: '1rem',
		height: '1rem',
		borderRadius: '0.5rem',
		borderWidth: '0.2rem',
		borderColor: 'white',
		backgroundColor: '$lunaNotificationCircle'
	},
	textContainer: {
		width: 0,
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
	textLastMessageUnread: {
		fontWeight: 'bold',
		color: '$primaryColor'
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
	},
	bubbleSubject: {
		color: '$primaryColor'
	}
})

ConversationListItem.propTypes = {
	lastUpdate: PropTypes.string.isRequired,
	partnerAvatarSmall: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	partnerName: PropTypes.string.isRequired,
	pending: PropTypes.bool.isRequired,
	subjectType: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

export default ConversationListItem

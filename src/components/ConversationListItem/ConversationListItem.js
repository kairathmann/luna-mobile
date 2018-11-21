import React from 'react'
import PropTypes from 'prop-types'
import EStyleSheet from 'react-native-extended-stylesheet'
import Moment from 'react-moment'
import { Image, Text, View } from 'react-native'
import { checkImageURL } from '../../common/utils'
import I18n from '../../../locales/i18n'

class ConversationListItem extends React.PureComponent {
	render() {
		const zoneOffset = new Date().getTimezoneOffset()
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={checkImageURL(this.props.partnerAvatarSmall)}
					/>
				</View>
				<View style={styles.textContainer}>
					<View style={{ flexWrap: 'wrap' }}>
						<Text style={styles.textUsername}>{this.props.partnerName}</Text>
					</View>
					<View style={{ flexWrap: 'wrap' }}>
						<Text style={styles.textLastMessage}>{this.props.subject}</Text>
					</View>
				</View>
				<View style={styles.textLastUpdatedContainer}>
					<Moment
						style={styles.textLastUpdated}
						locale={I18n.locale}
						element={Text}
						fromNow
						subtract={{ minutes: zoneOffset }}
					>
						{this.props.lastUpdate}
					</Moment>
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
	lastUpdate: PropTypes.string.isRequired,
	partnerAvatarSmall: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	partnerName: PropTypes.string.isRequired
}

export default ConversationListItem

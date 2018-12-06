import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-animatable'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import MessageAvatar from '../../../components/MessageAvatar/MessageAvatar'
import NewMessage from '../../../components/NewMessage/NewMessage'
import { createMessage } from './scenario-actions'

export class BidMessagePage extends React.Component {
	handleSend = message => {
		this.props.createMessage({
			partner: this.props.navigation.getParam('partner', {}),
			text: message,
			targetHid: this.props.targetHid
		})
	}

	render() {
		const partner = this.props.navigation.getParam('partner', {})
		return (
			<View style={{ flex: 1 }}>
				<View style={styles.avatarContainer}>
					<MessageAvatar
						conversation={{
							partnerAvatarMedium: partner.avatarUrl,
							partnerGender: partner.gidIs
						}}
					/>
					<Text style={styles.userInfo}>{partner.firstName}</Text>
				</View>
				<View style={{ flexGrow: 0, flexShrink: 1 }}>
					<NewMessage onSend={this.handleSend} />
				</View>
			</View>
		)
	}
}

BidMessagePage.propTypes = {
	targetHid: PropTypes.string.isRequired,
	navigation: PropTypes.object.isRequired,
	createMessage: PropTypes.func.isRequired
}

const styles = EStyleSheet.create({
	avatarContainer: {
		backgroundColor: 'white',
		flexGrow: 1
	},
	userInfo: {
		color: '#4f4f4f',
		fontSize: '1.1rem',
		fontFamily: 'Lato-Regular',
		marginRight: '1rem',
		textAlign: 'center'
	}
})

const mapStateToProps = state => {
	return {
		targetHid: state.profile.profile.targetHid
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createMessage: ({ targetHid, partner, text }) =>
			dispatch(createMessage({ targetHid, partner, text }))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BidMessagePage)

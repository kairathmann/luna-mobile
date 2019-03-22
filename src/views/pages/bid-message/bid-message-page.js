import PropTypes from 'prop-types'
import React from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import MessageAvatar from '../../../components/MessageAvatar/MessageAvatar'
import NewMessage from '../../../components/NewMessage/NewMessage'
import VideoRecordModal from '../../../components/VideoRecordModal'
import { createMessage } from './scenario-actions'

export class BidMessagePage extends React.Component {
	state = {
		showingVideoRecordingModal: false
	}

	handleSend = message => {
		this.props.createMessage({
			partner: this.props.navigation.getParam('partner', {}),
			text: message,
			targetHid: this.props.targetHid
		})
	}

	showRecordingModal = () => {
		this.setState({ showingVideoRecordingModal: true })
	}

	hideRecordingModal = () => {
		this.setState({ showingVideoRecordingModal: false })
	}

	render() {
		const partner = this.props.navigation.getParam('partner', {})
		return (
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior="padding"
				enabled={Platform.OS === 'ios'}
			>
				{this.state.showingVideoRecordingModal && (
					<VideoRecordModal
						onClose={this.hideRecordingModal}
						onRecordingFinish={() => {}}
					/>
				)}
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View style={styles.avatarContainer}>
						<MessageAvatar
							conversation={{
								partnerAvatarMedium: partner.avatarUrl,
								partnerGender: partner.gidIs
							}}
						/>
						<Text style={styles.userInfo}>{partner.firstName}</Text>
					</View>
				</TouchableWithoutFeedback>
				<View style={{ flexGrow: 0, flexShrink: 1 }}>
					<NewMessage
						onSend={this.handleSend}
						onCameraOpen={this.showRecordingModal}
					/>
				</View>
			</KeyboardAvoidingView>
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

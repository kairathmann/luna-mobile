import React from 'react'
import { Modal, SafeAreaView, Text, View } from 'react-native'
import { Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import EStyleSheet from 'react-native-extended-stylesheet'
import BackButton from '../BackButton'
import VideoBubble from '../VideoBubble/VideoBubble'
import VideoRecord from '../VideoRecord'
import I18n from '../../../locales/i18n'
import { MIN_VIDEO_DIMENSIONS } from '../../enums'

class VideoRecordModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: '',
			showPreview: false,
			lastUri: '',
			videoSize: MIN_VIDEO_DIMENSIONS
		}
	}

	onLayout = ({ nativeEvent }) => {
		const newVideoSize = this.calculateVideoSize(
			nativeEvent.layout.width,
			nativeEvent.layout.height
		)
		if (newVideoSize !== this.state.videoSize) {
			this.setState({ videoSize: newVideoSize })
		}
	}

	calculateVideoSize = (width, height) => {
		return Math.min(width, height)
	}

	componentDidMount() {
		this.mounted = true
	}

	componentWillUnmount() {
		this.mounted = false
	}

	clearError = () => {
		if (this.mounted && this.state.error !== '') {
			this.setState({ error: '' })
		}
	}

	setError = errorMessage => {
		if (errorMessage === '') {
			this.clearError()
		} else {
			if (this.mounted && this.state.error !== errorMessage) {
				this.setState({ error: errorMessage })
			}
		}
	}

	onRecordingFinish = source => {
		if (this.mounted) {
			this.setState({
				showPreview: true,
				lastUri: source.uri
			})
		}
	}

	restartRecording = () => {
		if (this.mounted) {
			this.setState({ error: '', showPreview: false })
		}
	}

	renderOkButton = () => (
		<Button
			style={styles.button}
			onPress={() => this.props.onRecordingFinish(this.state.lastUri)}
		>
			<Icon type="FontAwesome" name="check" style={styles.okIcon} />
			<Text style={styles.okText}>{I18n.t('common.ok')}</Text>
		</Button>
	)

	renderRecordAgainButton = () => (
		<Button style={styles.button} onPress={this.restartRecording}>
			<Icon type="Ionicons" name="md-refresh" style={styles.recordAgainIcon} />
			<Text style={styles.recordAgainText}>
				{I18n.t('common.record_again')}
			</Text>
		</Button>
	)

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={true}
				onRequestClose={this.props.onClose}
				onDismiss={this.props.onClose}
				hardwareAccelerated={true}
				supportedOrientations={['portrait', 'landscape']}
			>
				<BackButton
					iconStyle={{ color: 'black', fontSize: 32 }}
					onBack={this.props.onClose}
				/>
				<SafeAreaView style={styles.safeAreaView}>
					<View style={styles.container}>
						<View style={styles.textPromptContainer}>
							<Text style={styles.textPrompt}>
								{this.state.showPreview
									? I18n.t('common.preview_prompt')
									: I18n.t('common.recording_prompt')}
							</Text>
						</View>
						{this.state.error !== '' && (
							<View style={[styles.errorTextContainer, styles.centered]}>
								<Text style={styles.errorText}>{this.state.error}</Text>
							</View>
						)}
						<View
							style={[styles.videoRecordingContainer, styles.centered]}
							onLayout={this.onLayout}
						>
							{!this.state.showPreview && (
								<VideoRecord
									onRecordingFinish={this.onRecordingFinish}
									onRecordingError={this.setError}
									size={this.state.videoSize}
								/>
							)}
							{this.state.showPreview && (
								<VideoBubble
									visible={true}
									source={{ uri: this.state.lastUri }}
									onPlaybackError={this.setError}
									size={this.state.videoSize}
								/>
							)}
						</View>
						{this.state.showPreview && (
							<View style={styles.buttonsContainer}>
								{this.renderOkButton()}
								{this.renderRecordAgainButton()}
							</View>
						)}
					</View>
				</SafeAreaView>
			</Modal>
		)
	}
}

const styles = EStyleSheet.create({
	container: {
		flex: 1
	},
	textPromptContainer: {
		marginLeft: '0.5rem',
		marginRight: '0.5rem',
		flexShrink: 1,
		marginBottom: '0.5rem'
	},
	textPrompt: {
		fontSize: '1rem',
		color: '$primaryColor',
		textAlign: 'center'
	},
	errorTextContainer: {
		flex: 1
	},
	errorText: {
		fontSize: '1rem',
		color: 'red',
		textAlign: 'center'
	},
	videoRecordingContainer: {
		marginLeft: '2rem',
		marginRight: '2rem',
		flex: 2,
		marginBottom: '0.5rem'
	},
	buttonsContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: '0.5rem'
	},
	centered: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: '1rem',
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '$primaryColor',
		width: '80%'
	},
	okIcon: {
		color: '#32CD32'
	},
	okText: {
		color: 'white'
	},
	recordAgainIcon: {
		color: 'white'
	},
	recordAgainText: {
		color: 'white'
	},
	safeAreaView: {
		flex: 1,
		backgroundColor: 'transparent'
	}
})

VideoRecordModal.propTypes = {
	onRecordingFinish: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired
}

export default VideoRecordModal

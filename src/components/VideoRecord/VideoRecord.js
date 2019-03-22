import React from 'react'
import PropTypes from 'prop-types'
import {
	Alert,
	ActivityIndicator,
	PermissionsAndroid,
	Platform,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import Permissions from 'react-native-permissions'
import { Icon } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import { RNCamera } from 'react-native-camera'
import I18n from '../../../locales/i18n'
import {
	CAMERA_STATUSES,
	RECORDING_STATUSES,
	MAX_VIDEO_DIMENSIONS,
	MIN_VIDEO_DIMENSIONS,
	VIDEO_BORDER_WIDTH
} from '../../enums'
import ProgressCircle from '../ProgressCircle'

const MAX_RECORD_TIME_IN_SECONDS = 5
const PROGRESS_UPDATE_INTERVAL_VALUE = 100
const MAX_PROGRESS_VALUE = 100
const PROGRESS_UPDATE_INCREMENT_VALUE =
	MAX_PROGRESS_VALUE /
	((MAX_RECORD_TIME_IN_SECONDS * 1000) / PROGRESS_UPDATE_INTERVAL_VALUE)
const IOS_PERMISSIONS_ALERT_TIMEOUT_MS = 500

const BASIC_RECORD_OPTIONS = {
	maxDuration: MAX_RECORD_TIME_IN_SECONDS,
	quality: RNCamera.Constants.VideoQuality['720p'],
	mirrorVideo: true,
	mute: false
}

const RECORD_OPTIONS =
	Platform.OS === 'ios'
		? { ...BASIC_RECORD_OPTIONS, codec: RNCamera.Constants.VideoCodec['H264'] }
		: BASIC_RECORD_OPTIONS

class VideoRecord extends React.Component {
	state = {
		status: RECORDING_STATUSES.PERMISSIONS_MISSING,
		currentProgress: 0,
		recordingProgressUpdateIntervalId: ''
	}

	requestPermissions = async () => {
		if (Platform.OS !== 'android') {
			const cameraPermissions = await Permissions.request('camera')
			const microphonePermissions = await Permissions.request('microphone')
			return (
				cameraPermissions === 'authorized' &&
				microphonePermissions === 'authorized'
			)
		} else {
			const multipleResults = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.CAMERA,
				PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
			])
			return (
				multipleResults[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted' &&
				multipleResults[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
					'granted'
			)
		}
	}

	askForPermissions = async () => {
		const permissionsAccepted = await this.requestPermissions()
		if (!permissionsAccepted) {
			// Show Alert that camera can't be used due to missing permissions
			Alert.alert(
				I18n.t('common.missing_permissions_title'),
				I18n.t('common.missing_video_recording_permissions'),
				[{ text: I18n.t('common.ok') }],
				{ cancelable: true }
			)
			return false
		}
		return true
	}

	setErrorState = errorMessage => {
		if (this.mounted) {
			this.setState({
				status: RECORDING_STATUSES.ERROR,
				error: errorMessage,
				currentProgress: MAX_PROGRESS_VALUE // fill whole border of circle with red color
			})
		}
	}

	setReadyForRecordingState = () => {
		if (this.mounted && this.state.status !== RECORDING_STATUSES.WAITING) {
			this.setState({
				status: RECORDING_STATUSES.WAITING,
				error: '',
				currentProgress: 0
			})
		}
	}

	startRecording = () => {
		const updateProgressIntervalInstance = setInterval(() => {
			this.updateProgress()
		}, PROGRESS_UPDATE_INTERVAL_VALUE)
		this.setState({
			status: RECORDING_STATUSES.RECORDING,
			error: '',
			currentProgress: 1,
			recordingProgressUpdateIntervalId: updateProgressIntervalInstance
		})
	}

	updateProgress = () => {
		if (
			this.mounted &&
			this.state.currentProgress + PROGRESS_UPDATE_INCREMENT_VALUE !==
				this.state.currentProgress
		) {
			this.setState(state => ({
				currentProgress: state.currentProgress + PROGRESS_UPDATE_INCREMENT_VALUE
			}))
		}
	}

	recordVideo = async () => {
		const permissionGranted = await this.askForPermissions()
		if (!permissionGranted) {
			return
		}
		// refresh current camera instance permissions
		await this.camera.refreshPermissionsStatus()
		this.setReadyForRecordingState()
		try {
			this.startRecording()
			const result = await this.camera.recordAsync(RECORD_OPTIONS)
			this.camera.stopRecording()
			this.props.onRecordingFinish(result)
		} catch (err) {
			const errorMessage = I18n.t('common.errors.error_general_recording')
			this.setErrorState(errorMessage)
			this.props.onRecordingError(errorMessage)
		} finally {
			clearInterval(this.state.recordingProgressUpdateIntervalId)
		}
	}

	componentDidMount() {
		this.mounted = true
		if (Platform.OS === 'ios') {
			// timeout is requied on IOS as opening alert straight away might block Modal from ever showing up
			setTimeout(async () => {
				const permissionGranted = await this.askForPermissions()
				if (permissionGranted) {
					this.setState({ status: RECORDING_STATUSES.WAITING })
				}
			}, IOS_PERMISSIONS_ALERT_TIMEOUT_MS)
		}
	}

	componentWillUnmount() {
		this.mounted = false
		clearInterval(this.state.recordingProgressUpdateIntervalId)
	}

	renderCameraOverlayContentWaitingForPermissions = () => {
		return (
			<View style={[styles.cameraContent, styles.cameraContentSolidWhite]}>
				<ActivityIndicator size="small" />
			</View>
		)
	}

	renderCameraOverlayContentReadyForRecording = () => {
		return (
			<View style={[styles.cameraContent, styles.cameraContentTransparent]}>
				<TouchableOpacity onPress={this.recordVideo}>
					<Text style={styles.tapToRecordText}>
						{I18n.t('common.tap_to_record')}
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	renderCameraOverlayContentMissingPermissions = () => {
		return (
			<View style={[styles.cameraContent, styles.cameraContentSolidWhite]}>
				<TouchableOpacity onPress={this.recordVideo}>
					<Icon type="Feather" style={styles.icon} name="camera-off" />
				</TouchableOpacity>
			</View>
		)
	}

	renderCameraOverlayContentError = () => {
		return (
			<View style={[styles.cameraContent, styles.cameraContentSolidWhite]}>
				<Icon type="Feather" style={styles.iconError} name="camera-off" />
			</View>
		)
	}

	getBubbleBorderColorBasedOnStatus = status => {
		if (status === RECORDING_STATUSES.RECORDING) {
			return ['#F0F0F0', '#F27031']
		}
		if (status === RECORDING_STATUSES.UPLOADING) {
			return ['#E8F5E9', '#4CAF50']
		}
		if (status === RECORDING_STATUSES.WAITING) {
			return ['#F3E5F5', '#8E24AA']
		}
		if (status === RECORDING_STATUSES.ERROR) {
			return ['#F3E5F5', '#F82222']
		}

		return ['#F3E5F5', '#8E24AA']
	}

	render() {
		const { status, currentProgress } = this.state
		const [back, tint] = this.getBubbleBorderColorBasedOnStatus(status)
		const bubbleSize = this.props.size || MIN_VIDEO_DIMENSIONS
		return (
			<TouchableOpacity activeOpacity={1}>
				<ProgressCircle
					fillPercentage={currentProgress}
					minSize={MIN_VIDEO_DIMENSIONS}
					maxSize={MAX_VIDEO_DIMENSIONS}
					size={bubbleSize}
					tintColor={tint}
					backgroundColor={back}
					circleBorderWidth={VIDEO_BORDER_WIDTH}
				>
					{((Platform.OS === 'ios' &&
						status !== RECORDING_STATUSES.PERMISSIONS_MISSING) ||
						Platform.OS !== 'ios') && (
						<RNCamera
							ref={cam => {
								this.camera = cam
							}}
							style={{
								flex: 1,
								width: bubbleSize,
								height: bubbleSize,
								alignItems: 'center',
								alignSelf: 'center'
							}}
							type={RNCamera.Constants.Type.front}
							flashMode={RNCamera.Constants.FlashMode.on}
							onCameraReady={this.setReadyForRecordingState}
							notAuthorizedView={this.renderCameraOverlayContentMissingPermissions()}
							permissionDialogTitle={I18n.t('common.permissions.camera.title')}
							permissionDialogMessage={I18n.t(
								'common.permissions.camera.message'
							)}
							ratio={'16:9'}
						>
							{({ status: cameraStatus }) => {
								if (cameraStatus === CAMERA_STATUSES.PENDING_AUTHORIZATION) {
									return this.renderCameraOverlayContentWaitingForPermissions()
								}
								if (cameraStatus === CAMERA_STATUSES.NOT_AUTHORIZED) {
									return this.renderCameraOverlayContentMissingPermissions()
								}
								if (
									cameraStatus === CAMERA_STATUSES.READY &&
									status === RECORDING_STATUSES.WAITING
								) {
									return this.renderCameraOverlayContentReadyForRecording()
								}
								if (
									cameraStatus === CAMERA_STATUSES.READY &&
									status === RECORDING_STATUSES.ERROR
								) {
									return this.renderCameraOverlayContentError()
								}
								// it must be returned otheriwse Camera is empty and it won't record anything
								return <View />
							}}
						</RNCamera>
					)}
					{status === RECORDING_STATUSES.PERMISSIONS_MISSING &&
						this.renderCameraOverlayContentMissingPermissions()}
				</ProgressCircle>
			</TouchableOpacity>
		)
	}
}

const styles = EStyleSheet.create({
	cameraContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	cameraContentTransparent: {
		backgroundColor: 'transparent'
	},
	cameraContentSolidWhite: {
		backgroundColor: 'white'
	},
	tapToRecordText: {
		fontSize: 16,
		color: '$primaryColor',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	iconError: {
		color: 'red'
	},
	icon: {
		color: '$primaryColor'
	}
})

VideoRecord.propTypes = {
	onRecordingFinish: PropTypes.func.isRequired,
	onRecordingError: PropTypes.func.isRequired,
	size: PropTypes.number.isRequired
}

export default VideoRecord

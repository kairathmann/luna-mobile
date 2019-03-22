import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Video from 'react-native-video'
import rfblob from 'rn-fetch-blob'
import { withNavigationFocus } from 'react-navigation'
import I18n from '../../../locales/i18n'
import {
	MAX_VIDEO_DIMENSIONS,
	MIN_VIDEO_DIMENSIONS,
	VIDEO_BORDER_WIDTH,
	VIDEO_STATE
} from '../../enums'
import ProgressCircle from '../ProgressCircle'
import VideoPlaceholder from '../../assets/images/video-placeholder.png'

const PROGRESS_UPDATE_INTERVAL_VALUE_MS = 200

class VideoBubble extends Component {
	state = {
		duration: 0,
		currentTime: 0,
		status: VIDEO_STATE.LOADING,
		source: {}
	}

	async componentDidMount() {
		let videoUri = ''
		try {
			if (this.props.source.uri.startsWith('file://')) {
				videoUri = this.props.source.uri
			} else {
				const indexOfTheLastSlashInPath = this.props.source.uri.lastIndexOf('/')
				const fileName = this.props.source.uri.substring(
					indexOfTheLastSlashInPath + 1
				)
				const filePath = rfblob.fs.dirs.CacheDir + '/' + fileName
				const videoAlreadyExistsInDeviceStorageCache = await rfblob.fs.exists(
					filePath
				)
				if (videoAlreadyExistsInDeviceStorageCache) {
					videoUri = 'file://' + filePath
				} else {
					const savedPath = await rfblob
						.config({
							fileCache: true,
							path: filePath
						})
						.fetch('GET', this.props.source.uri)
					videoUri = 'file://' + savedPath.path()
				}
			}
			this.setState({
				source: { uri: videoUri },
				status: VIDEO_STATE.INITIALIZING_MEDIA_PLAYER
			})
		} catch (err) {
			this.setErrorState(err)
		}
	}

	componentDidUpdate(prevProps) {
		// pause when component is hidden
		if (
			this.player &&
			prevProps.visible === true &&
			this.props.visible === false
		) {
			this.setState({
				status: VIDEO_STATE.PAUSED
			})
		}
		// when component is shown again, initialize the video camera once more
		if (
			this.player &&
			prevProps.visible === false &&
			this.props.visible === true
		) {
			this.setState({
				status: VIDEO_STATE.INITIALIZING_MEDIA_PLAYER
			})
		}
	}

	setErrorState = () => {
		this.setState({
			status: VIDEO_STATE.ERROR,
			duration: 1,
			currentTime: 1
		})
		if (this.props.onPlaybackError) {
			const errorMessage = I18n.t(
				'common.errors.error_general_recording_playback'
			)
			this.props.onPlaybackError(errorMessage)
		}
	}

	videoError = () => {
		this.setErrorState()
	}

	onEnd = () => {
		this.setState(
			{
				currentTime: this.state.duration,
				status: VIDEO_STATE.PAUSED
			},
			() => {
				this.player.seek(0)
			}
		)
	}

	onLoad = data => {
		// ALSO CALL PAUSED HERE, AS onLoad will be called once again when component becomes visible
		// because Video is going to be mounted again and therefore this will be executed again
		this.setState(
			{ duration: data.duration, status: VIDEO_STATE.PAUSED },
			() => {
				this.player.seek(this.state.currentTime)
			}
		)
	}

	onProgress = data => {
		if (
			this.state.currentTime !== data.currentTime &&
			this.state.status === VIDEO_STATE.PLAYING
		) {
			this.setState({ currentTime: data.currentTime })
		}
	}

	onClick = () => {
		if (
			this.state.status === VIDEO_STATE.PLAYING ||
			this.state.status === VIDEO_STATE.PAUSED
		) {
			const statusesMap = {
				[VIDEO_STATE.PLAYING]: VIDEO_STATE.PAUSED,
				[VIDEO_STATE.PAUSED]: VIDEO_STATE.PLAYING
			}
			this.setState({ status: statusesMap[this.state.status] })
		}
	}

	getCurrentTimePercentage() {
		const { currentTime, duration } = this.state
		return currentTime > 0 ? (currentTime / duration) * 100 : 0
	}

	getColorForStatus = status => {
		if (status === VIDEO_STATE.LOADING) {
			return ['#F0F0F0', '#F27031']
		}
		if (status === VIDEO_STATE.ERROR) {
			return ['#F3E5F5', '#F82222']
		}

		return ['#F3E5F5', '#8E24AA']
	}

	onSeek = ({ currentTime }) => {
		if (this.state.currentTime !== currentTime) {
			this.setState({ currentTime })
		}
	}

	render() {
		const { status } = this.state
		const { placeholder } = this.props
		const videoPoster = placeholder ? { uri: placeholder } : VideoPlaceholder
		const [back, tint] = this.getColorForStatus(status)
		const flexCompleted = this.getCurrentTimePercentage()
		const bubbleSize = this.props.size || MIN_VIDEO_DIMENSIONS
		return (
			<View style={{ alignItems: 'center' }}>
				<ProgressCircle
					fillPercentage={flexCompleted}
					minSize={MIN_VIDEO_DIMENSIONS}
					maxSize={MAX_VIDEO_DIMENSIONS}
					size={bubbleSize}
					tintColor={tint}
					backgroundColor={back}
					circleBorderWidth={VIDEO_BORDER_WIDTH}
				>
					{this.props.visible &&
						this.props.isFocused && (
							<TouchableOpacity activeOpacity={1} onPress={this.onClick}>
								{this.state.status !== VIDEO_STATE.ERROR &&
									this.state.status !== VIDEO_STATE.LOADING && (
										<Video
											useTextureView={true}
											source={this.state.source}
											ref={ref => {
												this.player = ref
											}}
											resizeMode={'cover'}
											style={{ width: bubbleSize, height: bubbleSize }}
											onError={this.videoError}
											onEnd={this.onEnd}
											onLoad={this.onLoad}
											onSeek={this.onSeek}
											progressUpdateInterval={PROGRESS_UPDATE_INTERVAL_VALUE_MS}
											onProgress={this.onProgress}
											paused={
												this.state.status === VIDEO_STATE.PAUSED ||
												this.state.status ===
													VIDEO_STATE.INITIALIZING_MEDIA_PLAYER
											}
										/>
									)}
								{(this.state.status === VIDEO_STATE.LOADING ||
									this.state.status === VIDEO_STATE.ERROR ||
									this.state.status ===
										VIDEO_STATE.INITIALIZING_MEDIA_PLAYER) && (
									<Image
										style={{
											zIndex: 1000,
											position: 'absolute',
											width: bubbleSize,
											height: bubbleSize
										}}
										source={videoPoster}
									/>
								)}
							</TouchableOpacity>
						)}
				</ProgressCircle>
			</View>
		)
	}
}

VideoBubble.propTypes = {
	source: PropTypes.object.isRequired,
	placeholder: PropTypes.string,
	visible: PropTypes.bool,
	isFocused: PropTypes.bool,
	size: PropTypes.number,
	onPlaybackError: PropTypes.func
}

export default withNavigationFocus(VideoBubble)

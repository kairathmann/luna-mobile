import { Button as LinkButton, H1, Spinner } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import ImagePicker from 'react-native-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import DefaultFemale from '../../../../assets/images/default_female.png'
import DefaultMale from '../../../../assets/images/default_male.png'
import DefaultOther from '../../../../assets/images/default_other.png'
import Button from '../../../../components/Button'
import { PAGES_NAMES } from '../../../../navigation'
import { COLORS, flow, styles as commonStyles } from '../../../../styles'
import { LUNA_PRIMARY_COLOR } from '../../../../styles/colors'
import { uploadAvatar } from '../scenario-actions'

const options = {
	title: I18n.t('flow_page.avatar.select_image'),
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
}

export class AvatarPage extends React.Component {
	state = {
		avatar: this.props.profile.avatar || ''
	}

	handleNext = () => {
		const { avatar } = this.state
		this.props.next(avatar, PAGES_NAMES.FLOW_AGE_LIMIT)
		Keyboard.dismiss()
	}

	handleSkip = () => {
		this.props.navigation.navigate(PAGES_NAMES.FLOW_ALLDONE)
		Keyboard.dismiss()
	}

	calculateProgress = () => {
		const { avatar } = this.state

		const BASE_PROGRESS_VALUE = 0.6
		let newProgressValue = BASE_PROGRESS_VALUE
		if (avatar !== '') {
			newProgressValue += 0.1
		}
		return newProgressValue
	}

	handleGetImage = () => {
		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel || response.error || response.customButton) {
				return
			} else {
				this.setState({
					avatar: response.uri
				})
			}
		})
	}

	getDefaultImage = () => {
		switch (this.props.profile.gender) {
			case 1:
				return DefaultMale
			case 2:
				return DefaultFemale
			case 3:
				return DefaultOther
			default:
				return DefaultMale
		}
	}

	render() {
		const { avatar } = this.state
		return (
			<View style={flow.content}>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps={'handled'}
					enableOnAndroid={true}
					style={flow.innerContent}
				>
					<Progress.Bar
						indeterminate={this.props.isLoading}
						style={flow.progressBar}
						useNativeDriver={true}
						animationConfig={{ bounciness: 0.5 }}
						color={COLORS.LUNA_PRIMARY_COLOR}
						progress={this.calculateProgress()}
						width={null}
					/>
					<H1 style={flow.title}>{I18n.t('flow_page.avatar.title')}</H1>

					<View style={styles.uploadContainer}>
						<TouchableOpacity
							onPress={this.handleGetImage}
							disabled={this.props.isLoading}
							style={styles.previewContainer}
						>
							<Image
								style={[
									styles.preview,
									{ opacity: this.props.isLoading ? 0.75 : 1 }
								]}
								source={avatar ? { uri: avatar } : this.getDefaultImage()}
							/>
						</TouchableOpacity>
						{this.props.isLoading && (
							<View style={styles.loaderContainer}>
								<Spinner style={styles.loader} color={LUNA_PRIMARY_COLOR} />
							</View>
						)}
					</View>

					<Button
						disabled={this.props.isLoading}
						text={I18n.t('flow_page.avatar.next')}
						onPress={() => this.handleNext()}
					/>
					<LinkButton
						block
						disabled={this.props.isLoading}
						transparent
						onPress={() => this.handleSkip()}
					>
						<Text style={flow.skipText}>{I18n.t('flow_page.skip')}</Text>
					</LinkButton>
					<Text style={commonStyles.errorText}>{this.props.error}</Text>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

AvatarPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
	error: PropTypes.string,
	profile: PropTypes.object.isRequired,
	isLoading: PropTypes.bool
}

const styles = EStyleSheet.create({
	uploadContainer: {
		flexDirection: 'row',
		width: '100%',
		height: 256,
		justifyContent: 'center',
		alignContent: 'center',
		marginBottom: 16
	},
	// It's a little bit stupid
	previewContainer: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 256,
		height: 256,
		backgroundColor: '#fff',
		borderRadius: 128
	},
	preview: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 256,
		height: 256,
		backgroundColor: '#fff',
		borderRadius: 128
	},
	loaderContainer: {
		position: 'absolute',
		height: 256,
		width: 256,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loader: {
		justifyContent: 'center'
	}
})

const mapStateToProps = state => {
	return {
		profile: state.profile.profileToEdit,
		error: state.profile.error,
		isLoading: state.profile.isLoading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		next: (payload, next) => dispatch(uploadAvatar(payload, next))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AvatarPage)

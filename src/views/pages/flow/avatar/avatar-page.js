import { H1, Spinner } from 'native-base'
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
import { COLORS, styles as commonStyles } from '../../../../styles'
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
		this.props.next(avatar, PAGES_NAMES.FLOW_GENDER_SEXUALITY)
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
			<View style={styles.content}>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps={'handled'}
					enableOnAndroid={true}
					style={styles.innerContent}
				>
					<Progress.Bar
						style={styles.progressBar}
						useNativeDriver={true}
						animationConfig={{ bounciness: 0.5 }}
						color={COLORS.LUNA_PRIMARY_COLOR}
						progress={this.calculateProgress()}
						width={null}
					/>
					<H1 style={styles.title}>{I18n.t('flow_page.avatar.title')}</H1>

					<View
						style={{
							flexDirection: 'row',
							width: '100%',
							height: 256,
							justifyContent: 'center',
							alignContent: 'center',
							marginBottom: 16
						}}
					>
						<TouchableOpacity
							onPress={this.handleGetImage}
							disabled={this.props.loading}
							style={{
								borderWidth: 1,
								borderColor: 'rgba(0,0,0,0.2)',
								alignItems: 'center',
								justifyContent: 'center',
								width: 256,
								height: 256,
								backgroundColor: '#fff',
								borderRadius: 128
							}}
						>
							<Image
								style={{
									opacity: this.props.loading ? 0.75 : 1,
									borderWidth: 1,
									borderColor: 'rgba(0,0,0,0.2)',
									alignItems: 'center',
									justifyContent: 'center',
									width: 256,
									height: 256,
									backgroundColor: '#fff',
									borderRadius: 128
								}}
								source={avatar ? { uri: avatar } : this.getDefaultImage()}
							/>
						</TouchableOpacity>
						{this.props.loading && (
							<View
								style={{
									position: 'absolute',
									height: 256,
									width: 256,
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<Spinner
									style={{ justifyContent: 'center' }}
									color={LUNA_PRIMARY_COLOR}
								/>
							</View>
						)}
					</View>

					<Button
						text={I18n.t('flow_page.avatar.next')}
						onPress={() => this.handleNext()}
					/>
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
	loading: PropTypes.boolean.isRequired
}

const styles = EStyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: 'white'
	},
	innerContent: {
		padding: 16
	},
	title: {
		marginTop: 24,
		marginBottom: 24,
		fontWeight: 'bold'
	},
	errorText: {
		color: 'red',
		textAlign: 'center'
	},
	birthdayContainer: {
		marginBottom: 8
	},
	birthdayButton: {
		width: '100%',
		textAlign: 'left',
		padding: 0,
		marginTop: 12
	},
	birthdayText: {
		fontSize: 16
	},
	progressBar: {
		marginLeft: 16,
		marginRight: 16
	},
	datePickerButton: {
		color: '$primaryColor'
	},
	taglineCounter: {
		textAlign: 'right',
		marginTop: 8,
		marginBottom: 8
	},
	taglineCounterLimit: {
		color: LUNA_PRIMARY_COLOR
	}
})

const mapStateToProps = state => {
	return {
		profile: state.profile.profileToEdit,
		error: state.profile.error,
		loading: state.profile.isLoading
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

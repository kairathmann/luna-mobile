import MultiSlider from '@ptomasroos/react-native-multi-slider'
// import moment from 'moment'
import {
	Form,
	H3,
	Icon,
	Input,
	Item,
	Label,
	Picker,
	Spinner
} from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import {
	Dimensions,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import {
	avatarRelativeUrlToFullPhotoUrl,
	getLoaderImageForGender
} from '../../../common/utils'
import { GENDER } from '../../../enums'
import { styles as commonStyles } from '../../../styles'
import * as COLORS from '../../../styles/colors'
import { LUNA_PRIMARY_COLOR } from '../../../styles/colors'
import { uploadChanges } from './scenario-actions'

const options = {
	title: I18n.t('flow_page.avatar.select_image'),
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
}

// const maxDate = moment()
// 	.subtract(18, 'years')
// 	.toDate()
const MAX_AGE = 100
const MIN_AGE = 18
const EXTRA_MARGIN = 16
const MAX_LENGTH = 50

export class EditPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			avatarChanged: false,
			newAvatar: '',
			pickerOpened: false,
			name: props.profile.firstName || '',
			birthday: props.profile.birthDate || '',
			gender: props.profile.gidIs || 1,
			sexuality: props.profile.gidSeeking || 2,
			ageMax: props.profile.seekingAgeTo || MAX_AGE,
			ageMin: props.profile.seekingAgeFrom || MIN_AGE,
			minTouched: false,
			maxTouched: false,
			sliderWidth: this.calculateWidthOfMultiSlider(),
			tagline: this.props.profile.tagline || ''
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({
			saveProfile: this._saveChanges,
			disabled: false
		})
	}

	static getDerivedStateFromProps(props, state) {
		if (this.props) {
			this.props.navigation.setParams({
				disabled: props.isLoading || state.name === ''
			})
		}

		return null
	}

	_saveChanges = () => {
		this.props.navigation.setParams({
			disabled: this.props.isLoading
		})
		this.props.saveChanges(
			{
				firstName: this.state.name,
				gidIs: this.state.gender,
				gidSeeking: this.state.sexuality,
				tagline: this.state.tagline
			},
			this.state.avatarChanged ? { uri: this.state.newAvatar } : null
		)
	}

	onLayout = () => {
		const newSliderWidth = this.calculateWidthOfMultiSlider()
		if (newSliderWidth !== this.state.sliderWidth) {
			this.setState({ sliderWidth: newSliderWidth })
		}
	}

	calculateWidthOfMultiSlider = () => {
		const screenDimensions = Dimensions.get('window')
		return screenDimensions.width - 2 * EXTRA_MARGIN
	}

	handleChangeAge = values => {
		this.setState({
			ageMin: values[0],
			ageMax: values[1],
			minTouched: this.state.minTouched || values[0] !== this.state.ageMin,
			maxTouched: this.state.maxTouched || values[1] !== this.state.ageMax
		})
	}

	handleGetImage = () => {
		ImagePicker.showImagePicker(options, response => {
			if (response.didCancel || response.error || response.customButton) {
				return
			} else {
				this.setState({
					newAvatar: response.uri,
					avatarChanged: true
				})
			}
		})
	}

	handleChange = (event, field) => {
		this.setState({ [field]: event.nativeEvent.text }, () => {
			this.props.navigation.setParams({
				disabled: this.props.isLoading || this.state.name === ''
			})
		})
	}

	handleChangeTagline = (event, field) => {
		const text = event.nativeEvent.text
		if (text.length <= 50) {
			this.setState({ [field]: event.nativeEvent.text })
		}
	}

	handleChangeSelect = (value, field) => {
		this.setState({ [field]: value })
	}

	handleDatePicked = date => {
		this.setState({
			birthday: date,
			pickerOpened: false
		})
	}

	hideDateTimePicker = () => {
		this.setState({
			pickerOpened: false
		})
	}

	showDateTimePicker = () => {
		this.setState({
			pickerOpened: true
		})
	}

	getAvatarUrl = () => {
		const { avatarChanged, newAvatar } = this.state
		const {
			profile: { avatarUrl }
		} = this.props
		if (avatarChanged) {
			return { uri: newAvatar }
		} else {
			return avatarUrl
				? avatarRelativeUrlToFullPhotoUrl(avatarUrl)
				: this.getDefaultImage()
		}
	}

	renderAvatar = () => {
		return (
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
						source={this.getAvatarUrl()}
					/>
				</TouchableOpacity>
				{this.props.isLoading && (
					<View style={styles.loaderContainer}>
						<Spinner style={styles.loader} color={LUNA_PRIMARY_COLOR} />
					</View>
				)}
			</View>
		)
	}

	renderBirthdayAndNameForm = () => {
		const { name } = this.state
		return (
			<Form>
				<Item floatingLabel last>
					<Label>{I18n.t('flow_page.name_birthday.name')}</Label>
					<Input
						blurOnSubmit={false}
						onChange={val => this.handleChange(val, 'name')}
						value={name}
					/>
				</Item>
				{/*<Item stackedLabel style={styles.birthdayContainer} last>*/}
				{/*<Label>{I18n.t('flow_page.name_birthday.birthday')}</Label>*/}
				{/*<TouchableOpacity*/}
				{/*style={styles.birthdayButton}*/}
				{/*onPress={this.showDateTimePicker}*/}
				{/*>*/}
				{/*<Text style={styles.birthdayText}>*/}
				{/*{birthday !== ''*/}
				{/*? moment(birthday).format('DD-MM-YYYY')*/}
				{/*: 'DD-MM-YYYY'}*/}
				{/*</Text>*/}
				{/*</TouchableOpacity>*/}
				{/*<DateTimePicker*/}
				{/*maximumDate={maxDate}*/}
				{/*isVisible={pickerOpened}*/}
				{/*confirmTextStyle={styles.datePickerButton}*/}
				{/*cancelTextStyle={styles.datePickerButton}*/}
				{/*onConfirm={this.handleDatePicked}*/}
				{/*onCancel={this.hideDateTimePicker}*/}
				{/*/>*/}
				{/*</Item>*/}
			</Form>
		)
	}

	renderGender = () => {
		const { gender, sexuality } = this.state
		return (
			<Form>
				<Item picker last>
					<Label>
						{I18n.t('flow_page.gender_preferences.gender_placeholder')}
					</Label>
					<Picker
						mode="dropdown"
						iosIcon={<Icon name="ios-arrow-down-outline" />}
						placeholder={I18n.t(
							'flow_page.gender_preferences.gender_placeholder'
						)}
						placeholderStyle={{ color: '#bfc6ea' }}
						placeholderIconColor="#007aff"
						selectedValue={gender}
						onValueChange={selected =>
							this.handleChangeSelect(selected, 'gender')
						}
					>
						<Picker.Item label={I18n.t('common.male')} value={GENDER.MALE} />
						<Picker.Item
							label={I18n.t('common.female')}
							value={GENDER.FEMALE}
						/>
						<Picker.Item label={I18n.t('common.other')} value={GENDER.OTHER} />
					</Picker>
				</Item>
				<Item picker last>
					<Label>
						{I18n.t('flow_page.gender_preferences.sexuality_placeholder')}
					</Label>
					<Picker
						mode="dropdown"
						iosIcon={<Icon name="ios-arrow-down-outline" />}
						placeholder={I18n.t(
							'flow_page.gender_preferences.sexuality_placeholder'
						)}
						placeholderStyle={{ color: '#bfc6ea' }}
						placeholderIconColor="#007aff"
						selectedValue={sexuality}
						onValueChange={selected =>
							this.handleChangeSelect(selected, 'sexuality')
						}
					>
						<Picker.Item label={I18n.t('common.male')} value={GENDER.MALE} />
						<Picker.Item
							label={I18n.t('common.female')}
							value={GENDER.FEMALE}
						/>
						<Picker.Item label={I18n.t('common.both')} value={GENDER.OTHER} />
					</Picker>
				</Item>
			</Form>
		)
	}

	renderAgeLimits = () => {
		const { ageMin, ageMax, sliderWidth } = this.state
		return (
			<Form
				style={[styles.form, { paddingTop: 8, paddingBottom: 8 }]}
				onLayout={this.onLayout}
			>
				<View style={styles.dataEntryContainer}>
					<Text style={styles.dataEntryLeft}>
						{I18n.t('flow_page.age_limit.how_old')}
					</Text>
					<Text style={styles.dataEntryRight}>{`${ageMin} - ${ageMax}`}</Text>
				</View>
				<MultiSlider
					isMarkersSeparated={true}
					markerStyle={{
						backgroundColor: COLORS.LUNA_PRIMARY_COLOR
					}}
					selectedStyle={{ backgroundColor: COLORS.LUNA_PRIMARY_COLOR }}
					values={[ageMin, ageMax]}
					min={MIN_AGE}
					max={MAX_AGE}
					sliderLength={sliderWidth}
					onValuesChange={this.handleChangeAge}
				/>
				<View style={[styles.dataEntryContainer, styles.inboxContainer]}>
					<Text style={styles.dataEntryLeft}>
						{I18n.t('flow_page.age_limit.inbox_limit')}
					</Text>
					<Text style={styles.dataEntryRight}>{`max. 10 intros/day`}</Text>
				</View>
			</Form>
		)
	}

	renderTagline = () => {
		const { tagline } = this.state
		return (
			<React.Fragment>
				<Form>
					<Item floatingLabel last>
						<Label>{I18n.t('flow_page.tagline.inputLabel')}</Label>
						<Input
							numberOfLines={3}
							multiline={true}
							blurOnSubmit={false}
							onChange={val => this.handleChangeTagline(val, 'tagline')}
							value={tagline}
						/>
					</Item>
				</Form>
				<Text
					style={[
						styles.taglineCounter,
						tagline.length === MAX_LENGTH ? styles.taglineCounterLimit : {}
					]}
				>{`${tagline.length}/${MAX_LENGTH}`}</Text>
			</React.Fragment>
		)
	}

	getDefaultImage = getLoaderImageForGender

	render() {
		return (
			<ScrollView style={{ padding: 8 }}>
				<H3 style={styles.welcomePrompt}>
					{`${I18n.t('edit_page.welcome')} ${this.state.name}`}{' '}
				</H3>
				<Text style={commonStyles.errorText}>{this.props.errorText}</Text>
				{this.renderAvatar()}
				{/*TODO: should be hidden as API does not return birthdate*/}
				{this.renderBirthdayAndNameForm()}
				{this.renderGender()}
				{/*TODO: should be hidden as API does not return seeking_age_from and seeking_age_to*/}
				{/*{ this.renderAgeLimits() }*/}
				{this.renderTagline()}
			</ScrollView>
		)
	}
}

EditPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	saveChanges: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	isLoading: PropTypes.bool
}

const styles = EStyleSheet.create({
	welcomePrompt: {
		marginTop: 16,
		marginBottom: 16,
		justifyContent: 'center',
		textAlign: 'center'
	},
	uploadContainer: {
		marginTop: 16,
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
	datePickerButton: {
		color: '$primaryColor'
	},
	dataEntryContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%'
	},
	dataEntryRight: {
		textAlign: 'right',
		flex: 1,
		color: '#888'
	},
	dataEntryLeft: {
		textAlign: 'left',
		flex: 1
	},
	inboxContainer: {
		marginBottom: 8
	},
	form: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	taglineCounter: {
		textAlign: 'right',
		marginTop: 8,
		marginBottom: 8,
		paddingBottom: 16
	},
	taglineCounterLimit: {
		color: '$primaryColor'
	}
})

const mapStateToProps = state => {
	return {
		profile: state.profile.profileToEdit,
		isLoading: state.profile.isLoading,
		errorText: state.profile.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		saveChanges: (changes, avatar) => dispatch(uploadChanges(changes, avatar))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPage)

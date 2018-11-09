import moment from 'moment'
import { Form, H1, Input, Item, Label } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from 'react-native-modal-datetime-picker'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import Button from '../../../../components/Button'
import { PAGES_NAMES } from '../../../../navigation'
import { COLORS } from '../../../../styles'
import { saveChanges } from '../scenario-actions'
import { styles as commonStyles } from '../../../../styles'

const maxDate = moment()
	.subtract(18, 'years')
	.toDate()

export class NameBirthdayPage extends React.Component {
	state = {
		name: this.props.profile.name || '',
		birthday: this.props.profile.birthday || '',
		pickerOpened: false
	}

	handleChange = (event, field) => {
		this.setState({ [field]: event.nativeEvent.text })
	}

	handleNext = () => {
		const { name, birthday } = this.state
		if (name.length !== 0 && birthday.length !== 0) {
			this.props.next({ name, birthday }, PAGES_NAMES.GENDER_SEXUALITY)
			Keyboard.dismiss()
		}
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

	calculateProgress = () => {
		const { name, birthday } = this.state

		const BASE_PROGRESS_VALUE = 0.2
		let newProgressValue = BASE_PROGRESS_VALUE
		if (name.length !== 0) {
			newProgressValue += 0.1
		}
		if (birthday.length !== 0) {
			newProgressValue += 0.1
		}
		return newProgressValue
	}

	render() {
		const { name, birthday, pickerOpened } = this.state
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
					<H1 style={styles.title}>
						{I18n.t('flow_page.name_birthday.title')}
					</H1>
					<Form>
						<Item floatingLabel last>
							<Label>{I18n.t('flow_page.name_birthday.name')}</Label>
							<Input
								blurOnSubmit={false}
								onChange={val => this.handleChange(val, 'name')}
								value={name}
								returnKeyType={'next'}
								onSubmitEditing={() => {
									this.showDateTimePicker()
								}}
							/>
						</Item>
						<Item stackedLabel style={styles.birthdayContainer} last>
							<Label>{I18n.t('flow_page.name_birthday.birthday')}</Label>
							<TouchableOpacity
								style={styles.birthdayButton}
								onPress={this.showDateTimePicker}
							>
								<Text style={styles.birthdayText}>
									{birthday !== ''
										? moment(birthday).format('DD-MM-YYYY')
										: 'DD-MM-YYYY'}
								</Text>
							</TouchableOpacity>
							<DateTimePicker
								maximumDate={maxDate}
								isVisible={pickerOpened}
								confirmTextStyle={styles.datePickerButton}
								cancelTextStyle={styles.datePickerButton}
								onConfirm={this.handleDatePicked}
								onCancel={this.hideDateTimePicker}
							/>
						</Item>
					</Form>
					<Button
						disabled={!(name.length !== 0 && birthday.length !== 0)}
						text={I18n.t('flow_page.name_birthday.next')}
						onPress={() => this.handleNext()}
					/>
					<Text style={commonStyles.errorText}>{this.props.error}</Text>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

NameBirthdayPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
	error: PropTypes.string,
	profile: PropTypes.object.isRequired
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
	}
})

const mapStateToProps = state => {
	return {
		profile: state.profile.profileToEdit,
		error: state.profile.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		next: (payload, next) => dispatch(saveChanges(payload, next))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NameBirthdayPage)

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
import { styles as commonStyles, flow } from '../../../../styles'

const maxDate = moment()
	.subtract(18, 'years')
	.toDate()

export class NameBirthdayPage extends React.Component {
	state = {
		name: this.props.profile.firstName || '',
		birthDate: this.props.profile.birthDate || '',
		pickerOpened: false
	}

	handleChange = (event, field) => {
		this.setState({ [field]: event.nativeEvent.text })
	}

	handleNext = () => {
		const { name, birthDate } = this.state
		if (name.length !== 0 && birthDate.length !== 0) {
			this.props.next(
				{ firstName: name, birthDate },
				PAGES_NAMES.FLOW_GENDER_SEXUALITY
			)
			Keyboard.dismiss()
		}
	}

	handleDatePicked = date => {
		this.setState({
			birthDate: date,
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
		const { name, birthDate } = this.state

		const BASE_PROGRESS_VALUE = 0.2
		let newProgressValue = BASE_PROGRESS_VALUE
		if (name.length !== 0) {
			newProgressValue += 0.1
		}
		if (birthDate.length !== 0) {
			newProgressValue += 0.1
		}
		return newProgressValue
	}

	render() {
		const { name, birthDate, pickerOpened } = this.state
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
					<H1 style={flow.title}>{I18n.t('flow_page.name_birthday.title')}</H1>
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
									{birthDate !== ''
										? moment(birthDate).format('DD-MM-YYYY')
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
						disabled={
							!(name.length !== 0 && birthDate.length !== 0) ||
							this.props.isLoading
						}
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
	profile: PropTypes.object.isRequired,
	isLoading: PropTypes.bool
}

const styles = EStyleSheet.create({
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
		next: (payload, next) => dispatch(saveChanges(payload, next))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NameBirthdayPage)

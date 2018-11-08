import { Form, H1, Input, Item, Label } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Text, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import EStyleSheet from 'react-native-extended-stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import Button from '../../../../components/Button'
// import { login } from './scenario-actions'

export class NameBirthdayPage extends React.Component {
	state = {
		name: '',
		birthday: ''
	}

	inputs = {}

	handleChange = (event, field) => {
		this.setState({ [field]: event.nativeEvent.text })
	}

	handleNext = () => {
		const { name } = this.state
		if (name.length !== 0) {
			// this.props.login({ email, password })
		}
	}

	focusNextField = id => {
		this.inputs[id]._root.focus()
	}

	render() {
		const { name, birthday } = this.state
		return (
			<View style={styles.content}>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps={'handled'}
					enableOnAndroid={true}
					style={styles.innerContent}
				>
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
								getRef={input => {
									this.inputs['name'] = input
								}}
								onSubmitEditing={() => {
									this.focusNextField('password')
								}}
							/>
						</Item>
						<Item floatingLabel last>
							<Label>{I18n.t('flow_page.name_birthday.birthday')}</Label>
							{/*<Input*/}
							{/*returnKeyType={'done'}*/}
							{/*onChange={val => this.handleChange(val, 'birthday')}*/}
							{/*value={name}*/}
							{/*secureTextEntry={true}*/}
							{/*onSubmitEditing={() => {*/}
							{/*this.handleNext()*/}
							{/*}}*/}
							{/*getRef={input => {*/}
							{/*this.inputs['birthday'] = input*/}
							{/*}}*/}
							{/*/>*/}
							<DatePicker
								style={{ width: 200 }}
								date={birthday}
								mode="date"
								placeholder="select date"
								format="YYYY-MM-DD"
								minDate="2016-05-01"
								maxDate="2016-06-01"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								customStyles={{
									dateIcon: {
										position: 'absolute',
										left: 0,
										top: 4,
										marginLeft: 0
									},
									dateInput: {
										marginLeft: 36
									}
									// ... You can check the source to find the other keys.
								}}
								onDateChange={date => {
									this.setState({ date: date })
								}}
							/>
						</Item>
					</Form>
					<Button
						text={I18n.t('flow_page.name_birthday.next')}
						onPress={() => this.handleNext()}
					/>
					<Text style={styles.errorText}>{this.props.error}</Text>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

NameBirthdayPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	// next: PropTypes.func.isRequired,
	error: PropTypes.string
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
	prompt: {
		textAlign: 'center',
		marginTop: 16,
		marginBottom: 16
	},
	errorText: {
		color: 'red',
		textAlign: 'center'
	}
})

const mapStateToProps = state => {
	return {
		error: state.auth.signinError
	}
}

const mapDispatchToProps = () => {
	return {
		next: () => {}
		// login: payload => dispatch(login(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NameBirthdayPage)

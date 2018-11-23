import { Form, H1, Input, Item, Label } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'

import { Keyboard, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import validator from 'validator'
import { NavigationEvents } from 'react-navigation'
import I18n from '../../../../locales/i18n'
import Button from '../../../components/Button/'
import { auth, styles as commonStyles } from '../../../styles'
import { clearError, signup } from './scenario-actions'

const styles = auth

export class SignupPage extends React.Component {
	state = {
		email: '',
		password: '',
		emailValid: true,
		passwordValid: true,
		validationEnabled: false
	}

	inputs = {}

	componentDidMount() {
		this.setState({
			password: 'qweqweqwe'
		})
	}

	handleChange = (event, field) => {
		this.setState({ [field]: event.nativeEvent.text }, this.validateForm)
	}

	validateForm = () => {
		this.setState({
			emailValid: this.validateEmail(this.state.email),
			passwordValid: this.validatePassword(this.state.password)
		})
	}

	handleLink = () => {}

	handleSignup = () => {
		this.setState({ validationEnabled: true }, () => {
			const { email, password } = this.state
			const emailValid = this.validateEmail(email)
			const passwordValid = this.validatePassword(password)

			if (emailValid && passwordValid) {
				this.props.signup({ email, password })
				Keyboard.dismiss()
			} else {
				this.setState({
					emailValid,
					passwordValid
				})
			}
		})
	}

	validateEmail = email => {
		if (!this.state.validationEnabled) return true
		return !validator.isEmpty(email) && validator.isEmail(email)
	}

	validatePassword = password => {
		if (!this.state.validationEnabled) return true
		return (
			!validator.isEmpty(password) &&
			validator.isLength(password, { min: 8, max: undefined })
		)
	}

	focusNextField = id => {
		this.inputs[id]._root.focus()
	}

	clearErrorState = () => {
		if (this.props.error) {
			this.props.clearError()
		}
	}

	render() {
		const {
			emailValid,
			email,
			passwordValid,
			password,
			validationEnabled
		} = this.state
		return (
			<View style={styles.content}>
				<NavigationEvents onWillFocus={this.clearErrorState} />
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps={'handled'}
					enableOnAndroid={true}
					style={styles.innerContent}
				>
					<H1 style={styles.title}>{I18n.t('signup_page.title')}</H1>
					<Form style={styles.form}>
						<Item error={!emailValid} floatingLabel last>
							<Label>{I18n.t('common.email')}</Label>
							<Input
								keyboardType={'email-address'}
								blurOnSubmit={false}
								onChange={val => this.handleChange(val, 'email')}
								value={email}
								returnKeyType={'next'}
								getRef={input => {
									this.inputs['email'] = input
								}}
								onSubmitEditing={() => {
									this.focusNextField('password')
								}}
							/>
						</Item>
						<Item error={!passwordValid} floatingLabel last>
							<Label>{I18n.t('signup_page.password_with_info')}</Label>
							<Input
								returnKeyType={'done'}
								onChange={val => this.handleChange(val, 'password')}
								value={password}
								secureTextEntry={true}
								onSubmitEditing={() => {
									this.handleSignup()
								}}
								getRef={input => {
									this.inputs['password'] = input
								}}
							/>
						</Item>
					</Form>
					<Text style={styles.prompt}>
						{I18n.t('signup_page.agreement_1')}
						<Text
							style={commonStyles.underline}
							onPress={() => this.handleLink('terms')}
						>
							{I18n.t('signup_page.terms')}
						</Text>
						{I18n.t('signup_page.agreement_2')}
						<Text
							style={commonStyles.underline}
							onPress={() => this.handleLink('policy')}
						>
							{I18n.t('signup_page.policy')}
						</Text>
						.
					</Text>
					<Button
						disabled={validationEnabled && !(emailValid && passwordValid)}
						text={I18n.t('signup_page.sign_up')}
						onPress={() => this.handleSignup()}
					/>
					<Text style={commonStyles.errorText}>{this.props.error}</Text>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

SignupPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	signup: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	error: PropTypes.string
}

const mapStateToProps = state => {
	return {
		error: state.auth.signupError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		clearError: () => dispatch(clearError()),
		signup: payload => dispatch(signup(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignupPage)

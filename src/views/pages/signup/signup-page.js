import { Form, H1, Input, Item, Label } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../locales/i18n'
import Button from '../../../components/Button/'
import { signup } from './scenario-actions'

export class SignupPage extends React.Component {
	state = {
		email: '',
		password: '',
		emailValid: true,
		passwordValid: true,
		validationEnabled: false
	}

	inputs = {}

	handleChange = (event, field) => {
		this.setState({ [field]: event.nativeEvent.text }, this.validateForm)
	}

	validateForm = () => {
		this.setState({
			emailValid: this.validateEmail(this.state.email),
			passwordValid: this.validatePassword(this.state.password)
		})
	}

	handleLink = link => {
		console.log(` ${link} clicked`)
	}

	handleSignup = () => {
		this.setState({ validationEnabled: true }, () => {
			const { email, password } = this.state
			const emailValid = this.validateEmail(email)
			const passwordValid = this.validatePassword(password)

			if (emailValid && passwordValid) {
				this.props.signup({ email, password })
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
				<H1 style={styles.title}>{I18n.t('signup_page.title')}</H1>
				<Form>
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
						style={styles.underline}
						onPress={() => this.handleLink('terms')}
					>
						{I18n.t('signup_page.terms')}
					</Text>
					{I18n.t('signup_page.agreement_2')}
					<Text
						style={styles.underline}
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
					block
				/>
				<Text style={styles.errorText}>{this.props.error}</Text>
			</View>
		)
	}
}

SignupPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	signup: PropTypes.func.isRequired,
	error: PropTypes.string
}

const styles = EStyleSheet.create({
	content: {
		flex: 1,
		padding: 16,
		backgroundColor: 'white'
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
	underline: {
		textDecorationLine: 'underline'
	},
	backArrow: {
		top: 16,
		left: 16
	},
	errorText: {
		color: 'red',
		textAlign: 'center'
	}
})

const mapStateToProps = state => {
	return {
		error: state.auth.signupError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signup: payload => dispatch(signup(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignupPage)

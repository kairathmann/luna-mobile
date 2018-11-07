import { Form, H1, Input, Item, Label } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import Button from '../../../components/Button/'
import { signin } from './scenario-actions'

export class LoginPage extends React.Component {
	state = {
		email: '',
		password: '',
		validationEnabled: false
	}

	inputs = {}

	handleChange = (event, field) => {
		this.setState({ [field]: event.nativeEvent.text })
	}

	handleForgetClick = () => {}

	handleSignin = () => {
		this.setState({ validationEnabled: true }, () => {
			const { email, password } = this.state
			this.props.signin({ email, password })
		})
	}

	focusNextField = id => {
		this.inputs[id]._root.focus()
	}

	render() {
		const { email, password, validationEnabled } = this.state
		return (
			<View style={styles.content}>
				<H1 style={styles.title}>{I18n.t('login_page.title')}</H1>
				<Form>
					<Item
						error={validationEnabled && email.length === 0}
						floatingLabel
						last
					>
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
					<Item
						error={validationEnabled && password.length === 0}
						floatingLabel
						last
					>
						<Label>{I18n.t('login_page.password_with_info')}</Label>
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
				<Text
					onPress={this.handleForgetClick}
					style={[styles.prompt, styles.underline]}
				>
					{I18n.t('login_page.forget_password')}
				</Text>
				<Button
					disabled={
						validationEnabled && !(email.length !== 0 && password.length !== 0)
					}
					text={I18n.t('login_page.sign_in')}
					onPress={() => this.handleSignin()}
					block
				/>
				<Text style={styles.errorText}>{this.props.error}</Text>
			</View>
		)
	}
}

LoginPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	signin: PropTypes.func.isRequired,
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
		error: state.auth.signinError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signin: payload => dispatch(signin(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage)

import { Form, H1, Input, Item, Label } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Keyboard, StatusBar, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../locales/i18n'
import Button from '../../../components/Button/'
import { PAGES_NAMES } from '../../../navigation'
import { auth, styles as commonStyles } from '../../../styles'
import { clearError, login } from './scenario-actions'

const styles = auth

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

	handleForgetClick = () => {
		this.props.navigation.navigate(PAGES_NAMES.FORGOT_PASSWORD_PAGE)
	}

	handleSignin = () => {
		this.setState({ validationEnabled: true }, () => {
			const { email, password } = this.state
			if (
				email.length !== 0 &&
				password.length !== 0 &&
				validator.isEmail(email)
			) {
				this.props.login({ email, password })
				Keyboard.dismiss()
			}
		})
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
		const { email, password, validationEnabled } = this.state
		return (
			<View style={styles.content}>
				<StatusBar
					barStyle={'dark-content'}
					backgroundColor={'white'}
					translucent={false}
				/>
				<NavigationEvents onWillFocus={this.clearErrorState} />
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps={'handled'}
					enableOnAndroid={true}
					style={styles.innerContent}
				>
					<H1 style={styles.title}>{I18n.t('login_page.title')}</H1>
					<Form>
						<Item
							error={
								validationEnabled &&
								email.length === 0 &&
								!validator.isEmail(email)
							}
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
									this.handleSignin()
								}}
								getRef={input => {
									this.inputs['password'] = input
								}}
							/>
						</Item>
					</Form>
					<Text
						onPress={this.handleForgetClick}
						style={[styles.prompt, commonStyles.underline]}
					>
						{I18n.t('login_page.forget_password')}
					</Text>
					<Button
						disabled={
							validationEnabled &&
							!(
								email.length !== 0 &&
								password.length !== 0 &&
								validator.isEmail(email)
							)
						}
						text={I18n.t('login_page.sign_in')}
						onPress={() => this.handleSignin()}
					/>
					<Text style={commonStyles.errorText}>{this.props.error}</Text>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

LoginPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	error: PropTypes.string
}

const mapStateToProps = state => {
	return {
		error: state.auth.signinError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		clearError: () => dispatch(clearError()),
		login: payload => dispatch(login(payload))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage)

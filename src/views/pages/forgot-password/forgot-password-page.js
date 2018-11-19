import { Form, H1, Input, Item, Label } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Keyboard, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../locales/i18n'
import Button from '../../../components/Button/'
import { auth, styles as commonStyles } from '../../../styles'
import { resetPassword } from './scenario-actions'

const styles = auth

export class ForgotPasswordPage extends React.Component {
	state = {
		email: '',
		validationEnabled: false
	}

	handleChange = (event, field) => {
		this.setState({ [field]: event.nativeEvent.text })
	}

	onPasswordResetButtonClick = () => {
		this.setState({ validationEnabled: true }, () => {
			const { email } = this.state
			if (email.length !== 0 && validator.isEmail(email)) {
				this.props.resetPassword(email)
				Keyboard.dismiss()
			}
		})
	}

	render() {
		const { email, validationEnabled } = this.state
		return (
			<View style={styles.content}>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps={'handled'}
					enableOnAndroid={true}
					style={styles.innerContent}
				>
					<H1 style={styles.title}>{I18n.t('forgot_password_page.title')}</H1>
					<Form style={{ marginBottom: 20 }}>
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
								onChange={val => this.handleChange(val, 'email')}
								value={email}
							/>
						</Item>
					</Form>
					<Button
						disabled={
							validationEnabled &&
							!(email.length !== 0 && validator.isEmail(email))
						}
						text={I18n.t('forgot_password_page.reset_password_button')}
						onPress={this.onPasswordResetButtonClick}
					/>
					<Text style={commonStyles.errorText}>{this.props.error}</Text>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

ForgotPasswordPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	resetPassword: PropTypes.func.isRequired,
	error: PropTypes.string
}

const mapStateToProps = state => {
	return {
		error: state.auth.resetPasswordError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		resetPassword: email => dispatch(resetPassword(email))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotPasswordPage)

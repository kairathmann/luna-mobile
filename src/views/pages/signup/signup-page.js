import { Button, Form, H1, Input, Item, Label, Icon } from 'native-base'
import React from 'react'
import { StatusBar, Text, View, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SafeAreaView } from 'react-navigation'
import PropTypes from 'prop-types'

class SignupPage extends React.Component {
	state = {
		email: '',
		password: ''
	}

	inputs = {}

	handleChange = (val, field) => {
		this.setState({ [field]: val })
	}

	handleLink = link => {
		console.log(` ${link} clicked`)
	}

	handleSignup = () => {
		console.log('Signup clicked')
	}

	focusNextField = id => {
		this.inputs[id]._root.focus()
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
				<StatusBar backgroundColor={'#fff'} barStyle="dark-content" />

				<TouchableOpacity
					style={styles.backArrow}
					onPress={() => this.props.navigation.goBack()}
				>
					<Icon
						color={'black'}
						style={{ color: 'black' }}
						android={'md-arrow-back'}
						ios={'arrow-left'}
					/>
				</TouchableOpacity>
				<View style={styles.content}>
					<H1 style={styles.title}>Sign up</H1>
					<Form>
						<Item floatingLabel last>
							<Label>Email</Label>
							<Input
								keyboardType={'email-address'}
								blurOnSubmit={false}
								onChange={val => this.handleChange(val, 'email')}
								value={this.state.email}
								returnKeyType={'next'}
								getRef={input => {
									this.inputs['email'] = input
								}}
								onSubmitEditing={() => {
									this.focusNextField('password')
								}}
							/>
						</Item>
						<Item floatingLabel last>
							<Label>Password (min. 8 chars)</Label>
							<Input
								returnKeyType={'done'}
								onChange={val => this.handleChange(val, 'password')}
								value={this.state.password}
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
						I agree to the&nbsp;
						<Text
							style={styles.underline}
							onPress={() => this.handleLink('terms')}
						>
							Terms
						</Text>
						&nbsp;and&nbsp;
						<Text
							style={styles.underline}
							onPress={() => this.handleLink('policy')}
						>
							Privacy Policy
						</Text>
						.
					</Text>
					<Button onPressed={this.handleSignup} block>
						<Text>Next</Text>
					</Button>
				</View>
			</SafeAreaView>
		)
	}
}

SignupPage.propTypes = {
	navigation: PropTypes.object.isRequired
}

const styles = EStyleSheet.create({
	content: {
		flex: 1,
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
	underline: {
		textDecorationLine: 'underline'
	},
	backArrow: {
		top: 16,
		left: 16
	}
})

export default SignupPage

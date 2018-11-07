import PropTypes from 'prop-types'
import React from 'react'
import { Button as NativeBaseButton, Text } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'

const Button = ({ text, onPress, disabled, buttonStyle, textStyle }) => (
	<NativeBaseButton
		disabled={disabled}
		style={[styles.button, buttonStyle || '', disabled ? styles.disabled : '']}
		onPress={onPress}
	>
		<Text
			style={textStyle ? [styles.buttonText, textStyle] : styles.buttonText}
		>
			{text}
		</Text>
	</NativeBaseButton>
)

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	buttonStyle: PropTypes.object,
	textStyle: PropTypes.object
}

const styles = EStyleSheet.create({
	button: {
		marginBottom: '1rem',
		backgroundColor: '$primaryColor',
		justifyContent: 'center',
		width: '100%'
	},
	disabled: {
		opacity: 0.6
	},
	buttonText: {
		justifyContent: 'center'
	}
})

export default Button

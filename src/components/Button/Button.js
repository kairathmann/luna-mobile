import PropTypes from 'prop-types'
import React from 'react'
import { Button as NativeBaseButton, Text } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'

const Button = ({ text, onPress, buttonStyle, textStyle }) => (
	<NativeBaseButton
		style={buttonStyle ? [styles.button, buttonStyle] : styles.button}
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
	buttonText: {
		justifyContent: 'center'
	}
})

export default Button

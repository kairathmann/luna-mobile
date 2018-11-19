import PropTypes from 'prop-types'
import React from 'react'
import { ImageBackground, StatusBar, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Background from '../../assets/images/luna_logo.png'
import { LUNA_BACKGROUND_COLOR } from '../../styles/colors'

const LunaBackgroundImageView = ({ children }) => (
	<View style={[styles.container]}>
		<StatusBar backgroundColor={LUNA_BACKGROUND_COLOR} />
		<ImageBackground
			resizeMode="contain"
			style={styles.image}
			source={Background}
		>
			{children}
		</ImageBackground>
	</View>
)

LunaBackgroundImageView.propTypes = {
	children: PropTypes.node.isRequired
}

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '$primaryBackgroundColor',
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		marginLeft: 32,
		marginRight: 32
	}
})

export default LunaBackgroundImageView

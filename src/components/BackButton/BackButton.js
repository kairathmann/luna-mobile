import { Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Platform, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

class BackButton extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Button transparent onPress={this.props.onBack}>
						<Icon
							style={
								this.props.iconStyle ? this.props.iconStyle : { color: 'white' }
							}
							name="arrow-back"
						/>
					</Button>
				</View>
			</View>
		)
	}
}

const styles = EStyleSheet.create({
	container: {
		height: 48,
		paddingBottom: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		marginTop: Platform.OS === 'android' ? 12 : 0
	},
	leftContainer: {
		flex: 1
	}
})

BackButton.propTypes = {
	onBack: PropTypes.func.isRequired,
	iconStyle: PropTypes.any
}

export default BackButton

import PropTypes from 'prop-types'
import React from 'react'
import { Animated, Easing, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Loader from '../../../assets/logos/loader.png'
import LunaBackgroundImageView from '../../../components/LunaBackgroundImageView'

class FullLoader extends React.Component {
	constructor(props) {
		super(props)
		this.spinValue = new Animated.Value(0)
	}

	componentDidMount() {
		this.spin()
	}

	spin() {
		this.spinValue.setValue(0)
		Animated.timing(this.spinValue, {
			toValue: 1,
			duration: 2000,
			easing: Easing.inOut(Easing.cubic),
			useNativeDriver: true
		}).start(() => this.spin())
	}

	render() {
		const spin = this.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']
		})

		return (
			<LunaBackgroundImageView>
				<View style={styles.center}>
					<Animated.Image
						style={{
							width: 128,
							height: 128,
							transform: [{ rotate: spin }]
						}}
						source={Loader}
					/>
				</View>
			</LunaBackgroundImageView>
		)
	}
}

const styles = EStyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	}
})

FullLoader.propTypes = {
	navigation: PropTypes.object.isRequired
}

export default FullLoader

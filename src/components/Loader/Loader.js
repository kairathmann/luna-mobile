import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Animated, Easing, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import EStyleSheet from 'react-native-extended-stylesheet'
import LoaderIcon from '../../assets/logos/loader.png'
import LunaBackgroundImageView from '../LunaBackgroundImageView'

class Loader extends React.Component {
	constructor(props) {
		super(props)
		this.spinValue = new Animated.Value(0)
	}

	componentDidMount() {
		this.spin()
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.isLoading && this.props.isLoading) {
			this.spin()
		}
	}

	spin() {
		this.spinValue.setValue(0)
		Animated.loop(
			Animated.timing(this.spinValue, {
				toValue: 1,
				duration: 2000,
				easing: Easing.inOut(Easing.cubic),
				useNativeDriver: true
			})
		).start()
	}

	render() {
		const spin = this.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']
		})

		if (!this.props.isLoading) {
			return null
		}

		return (
			<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
				<LunaBackgroundImageView>
					<View style={styles.center}>
						<Animated.Image
							style={{
								width: 128,
								height: 128,
								transform: [{ rotate: spin }]
							}}
							source={LoaderIcon}
						/>
					</View>
				</LunaBackgroundImageView>
			</SafeAreaView>
		)
	}
}

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: '100%',
		height: '100%'
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	}
})

Loader.propTypes = {
	isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	isLoading: state.global.isLoading
})

const ConnectedLoader = connect(
	mapStateToProps,
	null
)(Loader)

export default Loader
export { ConnectedLoader }

import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const ProgressCircle = ({
	fillPercentage,
	minSize,
	maxSize,
	size,
	tintColor,
	backgroundColor,
	circleBorderWidth,
	children
}) => {
	const getComponentSize = () => {
		let calculatedSize = size
		if (size < minSize) {
			calculatedSize = minSize
		}
		if (size > maxSize) {
			calculatedSize = maxSize
		}
		return calculatedSize - 2 * circleBorderWidth
	}

	return (
		<AnimatedCircularProgress
			size={getComponentSize() + 2 * circleBorderWidth}
			width={circleBorderWidth}
			tintColor={tintColor}
			prefill={0}
			rotation={0}
			duration={0}
			backgroundColor={backgroundColor}
			fill={fillPercentage}
		>
			{() => (
				<View
					style={{
						width: getComponentSize(),
						height: getComponentSize(),
						borderRadius: getComponentSize() / 2,
						overflow: 'hidden'
					}}
				>
					{children}
				</View>
			)}
		</AnimatedCircularProgress>
	)
}

ProgressCircle.propTypes = {
	fillPercentage: PropTypes.number.isRequired,
	minSize: PropTypes.number.isRequired,
	maxSize: PropTypes.number.isRequired,
	size: PropTypes.number.isRequired,
	tintColor: PropTypes.string.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	circleBorderWidth: PropTypes.number.isRequired,
	children: PropTypes.node.isRequired
}

export default ProgressCircle

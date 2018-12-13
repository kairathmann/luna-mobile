import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'native-base'
import { ImageBackground, Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import { checkImageURL, getLoaderImageForGender } from '../../common/utils'
import { GENDER } from '../../enums'

const UserMatchView = ({ userProfile }) => (
	<ImageBackground
		imageStyle={styles.backgroundImage}
		style={styles.container}
		resizeMode="cover"
		source={checkImageURL(userProfile.avatarUrl)}
		defaultSource={getLoaderImageForGender(userProfile.gidIs)}
	>
		<View style={{ flex: 7 }} />
		<LinearGradient
			colors={['transparent', '#000']}
			style={styles.userInfoContainer}
		>
			<View style={styles.userInfoTextContainer}>
				<Text style={styles.userInfo}>
					{`${userProfile.firstName}, ${userProfile.age}`}
				</Text>
				<Icon
					type="MaterialCommunityIcons"
					name="information-outline"
					style={{ color: 'white' }}
				/>
			</View>
		</LinearGradient>
	</ImageBackground>
)

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		height: undefined,
		width: undefined
	},
	backgroundImage: {
		borderRadius: '3.1rem'
	},
	userInfoContainer: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: '3.1rem',
		borderBottomRightRadius: '3.1rem',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0
	},
	userInfoTextContainer: {
		marginLeft: '1rem',
		marginRight: '1rem',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	userInfo: {
		color: '#FFF',
		fontSize: '1.1rem',
		fontFamily: 'Lato-Regular',
		marginRight: '1rem',
		textAlign: 'center'
	}
})

UserMatchView.propTypes = {
	userProfile: PropTypes.shape({
		bio: PropTypes.string,
		firstName: PropTypes.string.isRequired,
		avatarUrl: PropTypes.string.isRequired,
		hid: PropTypes.string.isRequired,
		tagline: PropTypes.string,
		gidIs: PropTypes.oneOf([
			GENDER.MALE,
			GENDER.FEMALE,
			GENDER.BOTH,
			GENDER.OTHER
		]).isRequired,
		age: PropTypes.number.isRequired,
		minBid: PropTypes.string.isRequired
	})
}

export default UserMatchView

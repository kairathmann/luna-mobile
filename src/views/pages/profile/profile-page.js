import { Button, H3 } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HeaderImageScrollView from 'react-native-image-header-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { Header } from 'react-navigation'
import { connect } from 'react-redux'
import DefaultFemale from '../../../assets/images/default_female.png'
import DefaultMale from '../../../assets/images/default_male.png'
import DefaultOther from '../../../assets/images/default_other.png'
import StarIcon from '../../../assets/images/star-icon.png'
import { PAGES_NAMES } from '../../../navigation'

const { width } = Dimensions.get('window')

export class ProfilePage extends React.Component {
	componentDidMount() {
		this.props.navigation.setParams({ goToEditPage: this._goToEditPage })
	}

	_goToEditPage = () => {
		this.props.navigation.navigate(PAGES_NAMES.LOGIN_PAGE)
	}

	getDefaultImage = () => {
		switch (this.props.profile.gidIs) {
			case 1:
				return DefaultMale
			case 2:
				return DefaultFemale
			case 3:
				return DefaultOther
			default:
				return DefaultMale
		}
	}

	render() {
		return (
			<HeaderImageScrollView
				maxOverlayOpacity={0.4}
				minOverlayOpacity={0.1}
				fadeOutForeground
				renderForeground={() => (
					<LinearGradient
						style={styles.titleContainerGradient}
						locations={[0, 0.8, 1]}
						colors={[
							'rgba(255,255,255, 0)',
							'rgba(255,255,255,0)',
							'rgba(0,0,0, .5)'
						]}
					>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								alignContent: 'center',
								alignItems: 'center'
							}}
						>
							<Text style={styles.imageTitle}>
								{' '}
								{`${this.props.profile.name}, ${this.props.profile.age}`}
							</Text>
							<Text style={[styles.imageTitle, { marginLeft: 32 }]}>
								{this.props.profile.balance.confirmed}
							</Text>
							<Image
								style={{ width: 16, height: 16, marginLeft: 4 }}
								source={StarIcon}
							/>
						</View>
					</LinearGradient>
				)}
				maxHeight={width}
				minHeight={Header.HEIGHT}
				headerImage={
					this.props.profile.avatarUrl
						? { uri: this.props.profile.avatarUrl }
						: this.getDefaultImage()
				}
			>
				<View style={{ flex: 1, backgroundColor: '#efefef', paddingBottom: 8 }}>
					<View
						style={{
							backgroundColor: 'white',
							marginTop: 8,
							padding: 16,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.8,
							shadowRadius: 2,
							elevation: 2
						}}
					>
						<H3>Tagline</H3>
						<Text style={{ marginTop: 8, fontStyle: 'italic' }}>
							{this.props.profile.tagline}
						</Text>
					</View>
					<Button
						style={{ marginTop: 8, backgroundColor: 'white' }}
						full
						onPress={() => console.log('LOGOUT')}
					>
						<Text style={{ color: '#2b0f41' }}>Token</Text>
						<Image
							style={{ width: 24, height: 24, marginLeft: 8 }}
							source={StarIcon}
						/>
					</Button>
					<Button
						style={{ marginTop: 8 }}
						full
						danger
						onPress={() => console.log('LOGOUT')}
					>
						<Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
					</Button>
				</View>
			</HeaderImageScrollView>
		)
	}
}

ProfilePage.propTypes = {
	navigation: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

const styles = EStyleSheet.create({
	navTitleView: {
		height: Header.HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 1
	},
	navTitle: {
		color: 'white',
		fontSize: 18,
		backgroundColor: 'transparent'
	},
	titleContainer: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	titleContainerGradient: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: 16
	},
	imageTitle: {
		color: 'white',
		backgroundColor: 'transparent',
		fontSize: 24
	}
})

const mapStateToProps = () => {
	return {
		profile: {
			age: 27,
			name: 'Karol',
			gidIs: 3,
			tagline: '123123123 about me tagline yolo',
			balance: {
				confirmed: 100,
				unconfirmed: 105
			}
		}
	}
}

const mapDispatchToProps = () => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfilePage)

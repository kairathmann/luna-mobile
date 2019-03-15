import { Button, H3 } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import {
	Dimensions,
	Image,
	ScrollView,
	StatusBar,
	Text,
	View
} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import HeaderImageScrollView from 'react-native-image-header-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { withNavigation, Header } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import StarIcon from '../../../assets/images/star-icon.png'
import {
	checkImageURL,
	avatarRelativeUrlToFullPhotoUrl,
	getLoaderImageForGender,
	isHydraImage,
	isLandscape
} from '../../../common/utils'
import { ORIENTATION } from '../../../enums'
import { PAGES_NAMES } from '../../../navigation'
import { LUNA_PRIMARY_COLOR } from '../../../styles/colors'
import { logout, startEditing } from './scenario-actions'

export class ProfilePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			deviceOrientation: this.getDeviceOrientation()
		}
	}

	getDeviceOrientation = () => {
		const screenDimensions = Dimensions.get('screen')
		return isLandscape(screenDimensions.width, screenDimensions.height)
			? ORIENTATION.LANDSCAPE
			: ORIENTATION.PORTRAIT
	}

	onLayout = () => {
		const newDeviceOrientation = this.getDeviceOrientation()
		if (newDeviceOrientation !== this.state.deviceOrientation) {
			this.props.navigation.setParams({ orientation: newDeviceOrientation })
			this.setState({ deviceOrientation: newDeviceOrientation })
		}
	}

	componentDidMount() {
		if (!this.props.isUserViewDetails) {
			this.props.navigation.setParams({
				goToEditPage: this._goToEditPage,
				orientation: this.state.deviceOrientation
			})
		} else {
			this.props.navigation.setParams({
				orientation: this.state.deviceOrientation
			})
		}
	}

	_goToEditPage = () => {
		this.props.startEditing()
		this.props.navigation.navigate(PAGES_NAMES.EDIT_PROFILE)
	}

	getDefaultImage = getLoaderImageForGender

	getAvatarImage = () => {
		if (this.props.isUserViewDetails) {
			return checkImageURL(this.props.profile.avatarUrl)
		}
		return this.props.profile.avatarUrl &&
			!isHydraImage(this.props.profile.avatarUrl)
			? this.processIfLocal()
			: this.getDefaultImage(this.props.profile.gidIs)
	}

	processIfLocal = () => {
		if (this.props.profile.localAvatar) {
			return { uri: this.props.profile.avatarUrl }
		} else {
			return {
				uri: avatarRelativeUrlToFullPhotoUrl(this.props.profile.avatarUrl)
			}
		}
	}

	renderTitle = () => {
		const isLandscape = this.state.deviceOrientation === ORIENTATION.LANDSCAPE
		return (
			<View style={styles.centeredRow}>
				<Text
					numberOfLines={isLandscape ? 2 : 1}
					style={[
						styles.imageTitle,
						{
							flex: 4,
							maxWidth: isLandscape ? 256 : null,
							color: isLandscape ? '#222' : 'white'
						}
					]}
				>
					{`${this.props.profile.firstName}, ${this.props.profile.age}`}
				</Text>
				{!this.props.isUserViewDetails && (
					<React.Fragment>
						<View style={{ marginLeft: 32 }}>
							<Text
								style={[
									styles.imageTitle,
									{ color: isLandscape ? '#222' : 'white' }
								]}
							>
								{this.props.profile.balance
									? Number(this.props.profile.balance.confirmed)
									: 0}
							</Text>
						</View>
						<Image
							style={[styles.smallIcon, { marginLeft: 4 }]}
							source={StarIcon}
						/>
					</React.Fragment>
				)}
			</View>
		)
	}

	renderTagline = () => {
		return (
			<React.Fragment>
				<H3>{I18n.t('profile_page.tagline')}</H3>
				<Text style={styles.tagline}>
					{this.props.profile.tagline || I18n.t('profile_page.no_tagline')}
				</Text>
			</React.Fragment>
		)
	}

	renderBioLanscape = () => this.renderBio(false, this.props.profile.bio)

	renderBioPortrait = () => this.renderBio(true, this.props.profile.bio)

	renderBio = (isPortrait, profileBio) => (
		<React.Fragment>
			<H3>{I18n.t('profile_page.bio')}</H3>
			<ScrollView
				nestedScrollEnabled
				contentContainerStyle={{ flexGrow: 1, padding: 8 }}
				style={isPortrait ? { maxHeight: 100 } : {}}
			>
				<Text style={styles.bio}>
					{profileBio || I18n.t('profile_page.no_bio')}
				</Text>
			</ScrollView>
		</React.Fragment>
	)

	renderProfileData = () => {
		return (
			<View style={styles.portraitProfileDataContainer}>
				<View style={styles.card}>{this.renderTagline()}</View>
				<View style={[styles.card, { paddingRight: 0, paddingBottom: 8 }]}>
					{this.renderBioPortrait()}
				</View>
				{!this.props.isUserViewDetails && (
					<React.Fragment>
						<Button style={styles.tokenButton} full onPress={() => {}}>
							<Text style={styles.tokenButtonText}>
								{I18n.t('profile_page.token')}
							</Text>
							<Image style={styles.biggerIcon} source={StarIcon} />
						</Button>
						<Button
							style={{ marginTop: 8 }}
							full
							danger
							onPress={this.props.logout}
						>
							<Text style={styles.portraitLogoutText}>
								{I18n.t('common.logout')}
							</Text>
						</Button>
					</React.Fragment>
				)}
			</View>
		)
	}

	renderPortraitContent() {
		const { width } = Dimensions.get('window')
		return (
			<HeaderImageScrollView
				bounces={false}
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
							'rgba(0,0,0, .6)'
						]}
					>
						{this.renderTitle()}
					</LinearGradient>
				)}
				maxHeight={width}
				minHeight={Header.HEIGHT}
				headerImage={this.getAvatarImage()}
			>
				{this.renderProfileData()}
			</HeaderImageScrollView>
		)
	}

	renderLandscapeContent() {
		return (
			<View style={styles.landscapeContainer}>
				<View style={styles.landscapeAvatarContainer}>
					<Image
						style={styles.landscapeAvatar}
						source={this.getAvatarImage()}
					/>
					{this.renderTitle()}
				</View>
				<View style={styles.landscapeProfileDataContainer}>
					<View style={styles.shrinkItSelf}>{this.renderTagline()}</View>
					<View style={styles.bioContainerLandscape}>
						{this.renderBioLanscape()}
					</View>
					{!this.props.isUserViewDetails && (
						<View style={[styles.shrinkItSelf, styles.bringToBottom]}>
							<Button style={styles.tokenButton} full onPress={() => {}}>
								<Text style={styles.tokenButtonText}>
									{I18n.t('profile_page.token')}
								</Text>
								<Image style={styles.biggerIcon} source={StarIcon} />
							</Button>
							<Button
								style={styles.landscapeLogoutButton}
								full
								bordered
								onPress={this.props.logout}
							>
								<Text style={styles.landscapeLogoutButtonText}>
									{I18n.t('common.logout')}
								</Text>
							</Button>
						</View>
					)}
				</View>
			</View>
		)
	}

	render() {
		const { deviceOrientation } = this.state
		return (
			<View style={{ flex: 1 }} onLayout={this.onLayout}>
				<StatusBar
					translucent={false}
					barStyle={'light-content'}
					backgroundColor={LUNA_PRIMARY_COLOR}
				/>
				{deviceOrientation === ORIENTATION.PORTRAIT
					? this.renderPortraitContent()
					: this.renderLandscapeContent()}
			</View>
		)
	}
}

ProfilePage.propTypes = {
	navigation: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	startEditing: PropTypes.func,
	logout: PropTypes.func,
	isUserViewDetails: PropTypes.bool.isRequired
}

const styles = EStyleSheet.create({
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
	},
	centeredRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},
	smallIcon: {
		width: 16,
		height: 16
	},
	portraitProfileDataContainer: {
		flex: 1,
		width: '100%',
		backgroundColor: '#efefef',
		paddingBottom: 32
	},
	card: {
		backgroundColor: 'white',
		marginTop: 8,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.8,
		shadowRadius: 0,
		elevation: 2
	},
	tagline: {
		marginTop: 8,
		fontStyle: 'italic'
	},
	bio: {
		marginTop: 8,
		fontStyle: 'italic'
	},
	bioContainerLandscape: {
		flex: 1,
		marginTop: 10
	},
	biggerIcon: {
		width: 24,
		height: 24,
		marginLeft: 8
	},
	tokenButton: {
		marginTop: 8,
		backgroundColor: 'white'
	},
	tokenButtonText: { color: '#2b0f41' },
	portraitLogoutText: { color: 'white', fontWeight: 'bold' },
	landscapeContainer: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#efefef'
	},
	landscapeAvatarContainer: {
		paddingLeft: 16,
		paddingRight: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	landscapeAvatar: {
		backgroundColor: '#888',
		borderRadius: 105,
		width: 210,
		height: 210
	},
	landscapeLogoutButton: {
		marginTop: 8,
		marginBottom: 8,
		borderWidth: 2,
		borderColor: '$primaryColor'
	},
	landscapeLogoutButtonText: { color: '$primaryColor', fontWeight: 'bold' },
	landscapeProfileDataContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingRight: 16,
		marginTop: 40
	},
	shrinkItSelf: {
		flexShrink: 1,
		flexGrow: 0
	},
	bringToBottom: {
		justifyContent: 'flex-end'
	}
})

const mapStateToProps = state => {
	return {
		profile: state.profile.profile,
		isUserViewDetails: false
	}
}

const mapDispatchToProps = dispatch => {
	return {
		startEditing: () => dispatch(startEditing()),
		logout: () => dispatch(logout())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfilePage)

export const ProfilePageUserDetailView = withNavigation(({ navigation }) => (
	<ProfilePage
		isUserViewDetails={true}
		navigation={navigation}
		profile={navigation.getParam('userProfile', {})}
	/>
))

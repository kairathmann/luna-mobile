import { Form, H1, Icon, Item, Picker } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Keyboard, Platform, Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import Button from '../../../../components/Button'
import { PAGES_NAMES } from '../../../../navigation'
import { COLORS, styles as commonStyles } from '../../../../styles'
import { saveChanges } from '../scenario-actions'

export class GenderPreferencesPage extends React.Component {
	state = {
		gender: this.props.profile.gender || null,
		sexuality: this.props.profile.sexuality || null
	}

	handleChange = (value, field) => {
		this.setState({ [field]: value })
	}

	handleNext = () => {
		const { gender, sexuality } = this.state
		if (gender !== null && sexuality !== null) {
			this.props.next({ gender, sexuality }, PAGES_NAMES.GENDER_SEXUALITY)
			Keyboard.dismiss()
		}
	}

	calculateProgress = () => {
		const { gender, sexuality } = this.state

		const BASE_PROGRESS_VALUE = 0.4
		let newProgressValue = BASE_PROGRESS_VALUE
		if (gender !== -1 && gender !== null) {
			newProgressValue += 0.1
		}
		if (sexuality !== -1 && sexuality !== null) {
			newProgressValue += 0.1
		}
		return newProgressValue
	}

	render() {
		const { gender, sexuality } = this.state
		return (
			<View style={styles.content}>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps={'handled'}
					enableOnAndroid={true}
					style={styles.innerContent}
				>
					<Progress.Bar
						style={styles.progressBar}
						useNativeDriver={true}
						animationConfig={{ bounciness: 0.5 }}
						color={COLORS.LUNA_PRIMARY_COLOR}
						progress={this.calculateProgress()}
						width={null}
					/>
					<H1 style={styles.title}>
						{I18n.t('flow_page.gender_preferences.title')}
					</H1>
					<Form>
						<Item picker last>
							<Picker
								mode="dropdown"
								iosIcon={<Icon name="ios-arrow-down-outline" />}
								placeholder={I18n.t(
									'flow_page.gender_preferences.gender_placeholder'
								)}
								placeholderStyle={{ color: '#bfc6ea' }}
								placeholderIconColor="#007aff"
								selectedValue={gender}
								onValueChange={selected =>
									this.handleChange(selected, 'gender')
								}
							>
								{Platform.OS === 'android' && (
									<Picker.Item
										label={I18n.t(
											'flow_page.gender_preferences.gender_placeholder'
										)}
										value={null}
									/>
								)}
								<Picker.Item label={I18n.t('common.male')} value={1} />
								<Picker.Item label={I18n.t('common.female')} value={2} />
								<Picker.Item label={I18n.t('common.other')} value={3} />
							</Picker>
						</Item>
						<Item picker last>
							<Picker
								mode="dropdown"
								iosIcon={<Icon name="ios-arrow-down-outline" />}
								placeholder={I18n.t(
									'flow_page.gender_preferences.sexuality_placeholder'
								)}
								placeholderStyle={{ color: '#bfc6ea' }}
								placeholderIconColor="#007aff"
								selectedValue={sexuality}
								onValueChange={selected =>
									this.handleChange(selected, 'sexuality')
								}
							>
								{Platform.OS === 'android' && (
									<Picker.Item
										label={I18n.t(
											'flow_page.gender_preferences.sexuality_placeholder'
										)}
										value={null}
									/>
								)}
								<Picker.Item label={I18n.t('common.male')} value={1} />
								<Picker.Item label={I18n.t('common.female')} value={2} />
								<Picker.Item label={I18n.t('common.both')} value={3} />
							</Picker>
						</Item>
					</Form>
					<Text style={styles.prompt}>
						{I18n.t('flow_page.gender_preferences.prompt')}
					</Text>
					<Button
						disabled={!(gender !== null && sexuality !== null)}
						text={I18n.t('flow_page.gender_preferences.next')}
						onPress={() => this.handleNext()}
					/>
					<Text style={commonStyles.errorText}>{this.props.error}</Text>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

GenderPreferencesPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
	error: PropTypes.string,
	profile: PropTypes.object.isRequired
}

const styles = EStyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: 'white'
	},
	innerContent: {
		padding: 16
	},
	title: {
		marginTop: 24,
		marginBottom: 24,
		fontWeight: 'bold'
	},
	errorText: {
		color: 'red',
		textAlign: 'center'
	},
	progressBar: {
		marginLeft: 16,
		marginRight: 16
	},
	prompt: {
		textAlign: 'center',
		marginTop: 8,
		marginBottom: 8
	}
})

const mapStateToProps = state => {
	return {
		profile: state.profile.profileToEdit,
		error: state.profile.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		next: (payload, next) => dispatch(saveChanges(payload, next))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GenderPreferencesPage)

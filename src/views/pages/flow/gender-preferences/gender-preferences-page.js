import { Form, H1, Icon, Item, Picker } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Keyboard, Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import Button from '../../../../components/Button'
import { PAGES_NAMES } from '../../../../navigation'
import { COLORS, flow, styles as commonStyles } from '../../../../styles'
import { saveChanges } from '../scenario-actions'

export class GenderPreferencesPage extends React.Component {
	state = {
		gender: this.props.profile.gender || 1,
		sexuality: this.props.profile.sexuality || 2
	}

	handleChange = (value, field) => {
		this.setState({ [field]: value })
	}

	handleNext = () => {
		const { gender, sexuality } = this.state
		if (gender !== null && sexuality !== null) {
			this.props.next({ gender, sexuality }, PAGES_NAMES.FLOW_AVATAR)
			Keyboard.dismiss()
		}
	}

	calculateProgress = () => {
		return 0.5
	}

	render() {
		const { gender, sexuality } = this.state
		return (
			<View style={flow.content}>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps={'handled'}
					enableOnAndroid={true}
					style={flow.innerContent}
				>
					<Progress.Bar
						indeterminate={this.props.isLoading}
						style={flow.progressBar}
						useNativeDriver={true}
						animationConfig={{ bounciness: 0.5 }}
						color={COLORS.LUNA_PRIMARY_COLOR}
						progress={this.calculateProgress()}
						width={null}
					/>
					<H1 style={flow.title}>
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
						disabled={this.props.isLoading}
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
	profile: PropTypes.object.isRequired,
	isLoading: PropTypes.bool
}

const styles = EStyleSheet.create({
	prompt: {
		textAlign: 'center',
		marginTop: 8,
		marginBottom: 8
	}
})

const mapStateToProps = state => {
	return {
		profile: state.profile.profileToEdit,
		error: state.profile.error,
		isLoading: state.profile.isLoading
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

import { Form, H1, Input, Item, Label } from 'native-base'
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
import { COLORS, styles as commonStyles, flow } from '../../../../styles'
import { LUNA_PRIMARY_COLOR } from '../../../../styles/colors'
import { saveChanges } from '../scenario-actions'

const MAX_LENGTH = 50
export class TaglinePage extends React.Component {
	state = {
		tagline: this.props.profile.tagline || ''
	}

	handleChange = (event, field) => {
		const text = event.nativeEvent.text
		if (text.length <= 50) {
			this.setState({ [field]: event.nativeEvent.text })
		}
	}

	handleNext = () => {
		const { tagline } = this.state
		this.props.next({ tagline }, PAGES_NAMES.FLOW_ALLDONE)
		Keyboard.dismiss()
	}

	calculateProgress = () => {
		const { tagline } = this.state

		const BASE_PROGRESS_VALUE = 0.9
		let newProgressValue = BASE_PROGRESS_VALUE
		if (tagline.length !== 0) {
			newProgressValue += 0.1
		}
		return newProgressValue
	}

	render() {
		const { tagline } = this.state
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
					<H1 style={flow.title}>{I18n.t('flow_page.tagline.title')}</H1>
					<Text>{I18n.t('flow_page.tagline.tagline')}</Text>
					<Form>
						<Item floatingLabel last>
							<Label>{I18n.t('flow_page.tagline.inputLabel')}</Label>
							<Input
								numberOfLines={3}
								multiline={true}
								blurOnSubmit={false}
								maxLength={MAX_LENGTH}
								onChange={val => this.handleChange(val, 'tagline')}
								value={tagline}
								returnKeyType={'done'}
								onSubmitEditing={() => {
									this.handleNext()
								}}
							/>
						</Item>
					</Form>
					<Text
						style={[
							styles.taglineCounter,
							tagline.length === MAX_LENGTH ? styles.taglineCounterLimit : {}
						]}
					>{`${tagline.length}/${MAX_LENGTH}`}</Text>
					<Button
						disabled={this.props.isLoading}
						text={I18n.t('flow_page.tagline.next')}
						onPress={() => this.handleNext()}
					/>
					<Text style={commonStyles.errorText}>{this.props.error}</Text>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

TaglinePage.propTypes = {
	navigation: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
	error: PropTypes.string,
	profile: PropTypes.object.isRequired,
	isLoading: PropTypes.bool
}

const styles = EStyleSheet.create({
	taglineCounter: {
		textAlign: 'right',
		marginTop: 8,
		marginBottom: 8
	},
	taglineCounterLimit: {
		color: LUNA_PRIMARY_COLOR
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
)(TaglinePage)

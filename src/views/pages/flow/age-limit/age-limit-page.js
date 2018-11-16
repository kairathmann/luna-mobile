import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Button as LinkButton, Form, H1 } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Dimensions, Keyboard, Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import Button from '../../../../components/Button'
import { PAGES_NAMES } from '../../../../navigation'
import { COLORS, flow, styles as commonStyles } from '../../../../styles'
import { saveChanges } from '../scenario-actions'

const MAX_AGE = 100
const MIN_AGE = 18
const EXTRA_MARGIN = 32

export class AgeLimitPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ageMax: props.profile.seekingAgeTo || MAX_AGE,
			ageMin: props.profile.seekingAgeFrom || MIN_AGE,
			minTouched: false,
			maxtouched: false,
			sliderWidth: this.calculateWidthOfMultiSlider()
		}
	}

	onLayout = () => {
		const newSliderWidth = this.calculateWidthOfMultiSlider()
		if (newSliderWidth !== this.state.sliderWidth) {
			this.setState({ sliderWidth: newSliderWidth })
		}
	}

	calculateWidthOfMultiSlider = () => {
		const screenDimensions = Dimensions.get('window')
		return screenDimensions.width - 2 * EXTRA_MARGIN
	}

	handleChange = values => {
		this.setState({
			ageMin: values[0],
			ageMax: values[1],
			minTouched: this.state.minTouched || values[0] !== this.state.ageMin,
			maxTouched: this.state.maxTouched || values[1] !== this.state.ageMax
		})
	}

	handleNext = () => {
		const { ageMax, ageMin } = this.state
		this.props.next(
			{ seekingAgeTo: ageMax, seekingAgeFrom: ageMin },
			PAGES_NAMES.FLOW_TAGLINE
		)
		Keyboard.dismiss()
	}

	handleSkip = () => {
		this.props.navigation.navigate(PAGES_NAMES.FLOW_ALLDONE)
		Keyboard.dismiss()
	}

	calculateProgress = () => {
		const BASE_PROGRESS_VALUE = 0.7
		let value = BASE_PROGRESS_VALUE
		const { minTouched, maxTouched } = this.state
		if (minTouched) {
			value += 0.1
		}
		if (maxTouched) {
			value += 0.1
		}
		return value
	}

	render() {
		const { ageMin, ageMax, sliderWidth } = this.state
		return (
			<View style={flow.content} onLayout={this.onLayout}>
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
					<H1 style={flow.title}>{I18n.t('flow_page.age_limit.title')}</H1>
					<Form style={styles.form}>
						<View style={styles.dataEntryContainer}>
							<Text style={styles.dataEntryLeft}>
								{I18n.t('flow_page.age_limit.how_old')}
							</Text>
							<Text
								style={styles.dataEntryRight}
							>{`${ageMin} - ${ageMax}`}</Text>
						</View>
						<MultiSlider
							isMarkersSeparated={true}
							markerStyle={{
								backgroundColor: COLORS.LUNA_PRIMARY_COLOR
							}}
							selectedStyle={{ backgroundColor: COLORS.LUNA_PRIMARY_COLOR }}
							values={[ageMin, ageMax]}
							min={MIN_AGE}
							max={MAX_AGE}
							sliderLength={sliderWidth}
							onValuesChange={this.handleChange}
						/>
						<View style={[styles.dataEntryContainer, styles.inboxContainer]}>
							<Text style={styles.dataEntryLeft}>
								{I18n.t('flow_page.age_limit.inbox_limit')}
							</Text>
							<Text style={styles.dataEntryRight}>{`max. 10 intros/day`}</Text>
						</View>
					</Form>
					<Button
						disabled={this.props.isLoading}
						text={I18n.t('flow_page.age_limit.next')}
						onPress={() => this.handleNext()}
					/>
					<LinkButton
						block
						disabled={this.props.isLoading}
						transparent
						onPress={() => this.handleSkip()}
					>
						<Text style={flow.skipText}>{I18n.t('flow_page.skip')}</Text>
					</LinkButton>
					<Text style={commonStyles.errorText}>{this.props.error}</Text>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

AgeLimitPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	next: PropTypes.func.isRequired,
	error: PropTypes.string,
	profile: PropTypes.object.isRequired,
	isLoading: PropTypes.bool
}

const styles = EStyleSheet.create({
	dataEntryContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%'
	},
	dataEntryRight: {
		textAlign: 'right',
		flex: 1,
		color: '#888'
	},
	dataEntryLeft: {
		textAlign: 'left',
		flex: 1
	},
	inboxContainer: {
		marginBottom: 8
	},
	form: {
		justifyContent: 'center',
		alignItems: 'center'
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
)(AgeLimitPage)

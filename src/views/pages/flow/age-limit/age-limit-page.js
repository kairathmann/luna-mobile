import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Form, H1 } from 'native-base'
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
import { COLORS, styles as commonStyles } from '../../../../styles'
import { saveChanges } from '../scenario-actions'

export class AgeLimitPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			ageMax: props.profile.ageMax || 100,
			ageMin: props.profile.ageMin || 18,
			sliderWidth: 280
		}
	}

	componentDidMount() {
		const { width } = Dimensions.get('window')
		this.setWidth(width)
		Dimensions.addEventListener('change', ({ window: { width } }) => {
			this.setWidth(width)
		})
	}

	setWidth(width) {
		this.setState({
			sliderWidth: width - 64
		})
	}

	componentWillUnmount() {
		Dimensions.removeEventListener('change')
	}

	handleChange = values => {
		this.setState({
			ageMin: values[0],
			ageMax: values[1]
		})
	}

	handleNext = () => {
		const { ageMax, ageMin } = this.state
		this.props.next({ ageMax, ageMin }, PAGES_NAMES.FLOW_GENDER_SEXUALITY)
		Keyboard.dismiss()
	}

	calculateProgress = () => {
		const BASE_PROGRESS_VALUE = 0.6
		return BASE_PROGRESS_VALUE
	}

	render() {
		const { ageMin, ageMax, sliderWidth } = this.state
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
					<H1 style={styles.title}>{I18n.t('flow_page.age_limit.title')}</H1>
					<Form style={{ justifyContent: 'center', alignItems: 'center' }}>
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
							min={18}
							max={100}
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
						text={I18n.t('flow_page.age_limit.next')}
						onPress={() => this.handleNext()}
					/>
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
	birthdayContainer: {
		marginBottom: 8
	},
	birthdayButton: {
		width: '100%',
		textAlign: 'left',
		padding: 0,
		marginTop: 12
	},
	birthdayText: {
		fontSize: 16
	},
	progressBar: {
		marginLeft: 16,
		marginRight: 16
	},
	datePickerButton: {
		color: '$primaryColor'
	},
	prompt: {
		textAlign: 'center',
		marginTop: 8,
		marginBottom: 8
	},
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
)(AgeLimitPage)

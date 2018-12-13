import {
	Body,
	CheckBox,
	Form,
	H3,
	Input,
	Item,
	Label,
	ListItem,
	Spinner,
	Text
} from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { View } from 'react-native-animatable'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Answers } from 'react-native-fabric'
import connect from 'react-redux/es/connect/connect'
import I18n from '../../../../locales/i18n'
import Button from '../../../components/Button/Button'
import { REASONS } from '../../../enums'
import { styles as commonStyles } from '../../../styles'
import { LUNA_PRIMARY_COLOR } from '../../../styles/colors'
import {
	deleteAccount,
	disableAccount,
	startManaging
} from './scenario-actions'

const MAX_LENGTH = 500

export class ManageReasonPage extends React.Component {
	state = {
		password: '',
		reasons: [],
		extraReason: ''
	}

	componentDidMount() {
		this.props.startManaging()
		Answers.logContentView('Reason Page')
	}

	handleChange = (event, field) => {
		this.setState({ [field]: event.nativeEvent.text })
	}

	handleSelect = reason => {
		const checked = this.state.reasons.findIndex(r => r === reason.index) !== -1
		if (!checked) {
			this.setState({
				reasons: [...this.state.reasons, reason.index]
			})
		} else {
			this.setState({
				reasons: this.state.reasons.filter(r => r !== reason.index)
			})
		}
	}

	parseReasons(reasons) {
		return reasons.join(';')
	}

	shouldBeChecked = reason => {
		return this.state.reasons.findIndex(r => r === reason.index) !== -1
	}

	render() {
		const { password, extraReason, reasons } = this.state
		const { headerText, promptText, isChanging, error } = this.props
		if (isChanging) {
			return <Spinner />
		}
		return (
			<React.Fragment>
				<ScrollView style={{ padding: 8 }}>
					<H3 style={styles.headerText}>{I18n.t(headerText)}</H3>
					<Text style={styles.normalText}>{I18n.t(promptText)}</Text>
					<Form>
						<Item
							error={error !== '' || password.length === 0}
							floatingLabel
							last
						>
							<Label>{I18n.t('manage_page.type_password')}</Label>
							<Input
								returnKeyType={'done'}
								onChange={val => this.handleChange(val, 'password')}
								value={password}
								secureTextEntry={true}
							/>
						</Item>
					</Form>
					<Text style={commonStyles.errorText}>{error}</Text>
					<H3 style={styles.headerText}>
						{I18n.t('manage_page.care_tell_why')}
					</H3>
					<View>
						{REASONS.map(reason => (
							<ListItem
								onPress={() => this.handleSelect(reason)}
								key={`reason-key-${reason.index}`}
							>
								<CheckBox
									onPress={() => this.handleSelect(reason)}
									color={LUNA_PRIMARY_COLOR}
									checked={this.shouldBeChecked(reason)}
								/>
								<Body>
									<Text>{I18n.t(`manage_page.${reason.slug}`)}</Text>
								</Body>
							</ListItem>
						))}
					</View>
					<Form>
						<Item floatingLabel last>
							<Label>{I18n.t('manage_page.additional_reason')}</Label>
							<Input
								numberOfLines={3}
								maxLength={MAX_LENGTH}
								multiline={true}
								blurOnSubmit={false}
								onChange={val => this.handleChange(val, 'extraReason')}
								value={extraReason}
							/>
						</Item>
						<Text
							style={[
								styles.counter,
								extraReason.length === MAX_LENGTH ? styles.counterLimit : {}
							]}
						>{`${extraReason.length}/${MAX_LENGTH}`}</Text>
					</Form>
					<Button
						disabled={password.length === 0}
						text={I18n.t(this.props.buttonText)}
						onPress={() =>
							this.props.execute({
								password,
								reasons: this.parseReasons(reasons),
								comment: extraReason
							})
						}
					/>
				</ScrollView>
			</React.Fragment>
		)
	}
}

ManageReasonPage.propTypes = {
	navigation: PropTypes.object.isRequired,
	headerText: PropTypes.string.isRequired,
	promptText: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	execute: PropTypes.func.isRequired,
	startManaging: PropTypes.func.isRequired,
	error: PropTypes.string,
	isChanging: PropTypes.bool.isRequired
}

const styles = EStyleSheet.create({
	headerText: {
		textAlign: 'center',
		marginTop: 16,
		marginBottom: 16
	},
	normalText: {
		color: '#383838',
		marginBottom: 8,
		textAlign: 'center',
		fontWeight: '300'
	},
	counter: {
		textAlign: 'right',
		marginTop: 8,
		marginBottom: 8,
		paddingBottom: 16
	},
	counterLimit: {
		color: '$primaryColor'
	}
})

function addProps(extraProps) {
	return Component =>
		function InnerComponent(props) {
			return <Component {...props} {...extraProps} />
		}
}

const mapStateToProps = state => {
	return {
		error: state.profile.status.error,
		isChanging: state.profile.status.isChanging
	}
}

const mapDispatchToPropsDelete = dispatch => {
	return {
		startManaging: () => dispatch(startManaging()),
		execute: data => dispatch(deleteAccount(data))
	}
}

const mapDispatchToPropsDisable = dispatch => {
	return {
		startManaging: () => dispatch(startManaging()),
		execute: data => dispatch(disableAccount(data))
	}
}

const disableTranslations = {
	headerText: 'manage_page.disable',
	promptText: 'manage_page.disable_text',
	buttonText: 'manage_page.confirm_disable'
}

const deleteTranslations = {
	headerText: 'manage_page.delete',
	promptText: 'manage_page.delete_text',
	buttonText: 'manage_page.confirm_delete'
}

export const ManageDisableReasonPage = connect(
	mapStateToProps,
	mapDispatchToPropsDisable
)(addProps(disableTranslations)(ManageReasonPage))

export const ManageDeleteReasonPage = connect(
	mapStateToProps,
	mapDispatchToPropsDelete
)(addProps(deleteTranslations)(ManageReasonPage))

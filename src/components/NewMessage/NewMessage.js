import { Icon } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Keyboard, TextInput, View, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../locales/i18n'
import { LUNA_PRIMARY_COLOR } from '../../styles/colors'

export default class NewMessage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: ''
		}
	}

	handleChange = e => {
		this.setState({
			value: e.nativeEvent.text
		})
	}

	handleSend = () => {
		Keyboard.dismiss()
		this.props.onSend(this.state.value)
		this.setState({
			value: ''
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.textInput}
					multiline={true}
					numberOfLines={1}
					maxLength={1024}
					placeholder={I18n.t('common.message_placeholder')}
					selectionColor={LUNA_PRIMARY_COLOR}
					tintColor={LUNA_PRIMARY_COLOR}
					onChange={this.handleChange}
					value={this.state.value}
				/>
				<Icon
					disabled={this.state.value.length === 0}
					onPress={this.handleSend}
					style={[
						styles.icon,
						{ opacity: this.state.value.length === 0 ? 0.25 : 1.0 }
					]}
					name={'send'}
				/>
			</View>
		)
	}
}

const styles = EStyleSheet.create({
	container: {
		minHeight: Platform.OS === 'ios' ? 50 : 2,
		paddingLeft: 12,
		paddingRight: 12,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: '#80808080',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textInput: { flex: 1, fontSize: 18 },
	icon: { color: '$primaryColor' }
})

NewMessage.propTypes = {
	onSend: PropTypes.func.isRequired
}

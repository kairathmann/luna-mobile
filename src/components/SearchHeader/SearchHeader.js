import { Icon } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Header } from 'react-navigation'
import { LUNA_PRIMARY_COLOR } from '../../styles/colors'

export default class SearchHeader extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: ''
		}
	}

	handleChange = e => {
		this.setValue(e.nativeEvent.text)
	}

	handleClear = () => {
		this.setValue('')
	}

	setValue = value => {
		this.setState(
			{
				value
			},
			() => {
				this.props.onSearch(value)
			}
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<Icon name={'search'} style={styles.searchIcon} />
				<TextInput
					style={styles.textInput}
					placeholder={'Search...'}
					onChange={this.handleChange}
					value={this.state.value}
					selectionColor={LUNA_PRIMARY_COLOR}
				/>
				<Icon
					onPress={this.handleClear}
					name={'close'}
					style={styles.clearIcon}
				/>
			</View>
		)
	}
}

SearchHeader.propTypes = {
	onSearch: PropTypes.func.isRequired
}

const styles = EStyleSheet.create({
	container: {
		elevation: 2,
		backgroundColor: 'white',
		height: Header.HEIGHT,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 16,
		paddingRight: 16
	},
	searchIcon: {
		color: '#4f4f4f',
		marginRight: 8
	},
	clearIcon: { color: '#4f4f4f' },
	textInput: { flex: 1, fontSize: 18, color: '#4f4f4f' }
})

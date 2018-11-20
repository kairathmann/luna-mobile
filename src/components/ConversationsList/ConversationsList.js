import React from 'react'
import PropTypes from 'prop-types'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FlatList } from 'react-native'
import { GENDER } from '../../enums'
import ConversationListItem from '../ConversationListItem'

class ConversationsList extends React.PureComponent {
	_keyExtractor = item => `${item.id}`
	_renderItem = ({ item }) => <ConversationListItem conversation={item} />
	render() {
		return (
			<FlatList
				contentContainerStyle={styles.listContainerStyle}
				data={this.props.conversations}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
				refreshing={this.props.refreshing}
				onRefresh={this.props.onRefresh}
			/>
		)
	}
}

const styles = EStyleSheet.create({
	listContainerStyle: {
		flexGrow: 1,
		backgroundColor: 'white'
	}
})

ConversationsList.propTypes = {
	refreshing: PropTypes.bool.isRequired,
	onRefresh: PropTypes.func.isRequired,
	conversations: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			lastMessageSenderHid: PropTypes.string.isRequired,
			lastUpdate: PropTypes.string.isRequired,
			partnerAvatarMedium: PropTypes.string.isRequired,
			partnerAvatarSmall: PropTypes.string.isRequired,
			partnerGender: PropTypes.oneOf([
				GENDER.BOTH,
				GENDER.FEMALE,
				GENDER.MALE,
				GENDER.OTHER
			]).isRequired,
			partnerHid: PropTypes.string.isRequired,
			partnerName: PropTypes.string.isRequired,
			pending: PropTypes.bool.isRequired,
			subject: PropTypes.string.isRequired
		})
	).isRequired
}

export default ConversationsList

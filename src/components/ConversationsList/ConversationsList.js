import React from 'react'
import PropTypes from 'prop-types'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FlatList } from 'react-native'
import { GENDER } from '../../enums'
import ConversationListItem from '../ConversationListItem'

class ConversationsList extends React.PureComponent {
	_keyExtractor = item => `${item.id}`
	_renderItem = ({ item }) => (
		<ConversationListItem
			lastUpdate={item.lastUpdate}
			subject={item.subject}
			subjectType={item.subjectType}
			partnerAvatarSmall={item.partnerAvatarSmall}
			partnerName={item.partnerName}
			pending={item.pending}
			onClick={() => this.props.handleClick(item)}
		/>
	)
	render() {
		return (
			<FlatList
				contentContainerStyle={styles.listContainerStyle}
				data={this.props.conversations}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
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
			subject: PropTypes.string.isRequired,
			subjectType: PropTypes.string.isRequired
		})
	).isRequired,
	handleClick: PropTypes.func.isRequired
}

export default ConversationsList

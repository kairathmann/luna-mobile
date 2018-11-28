import React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class MessagePage extends React.Component {
	componentDidMount() {
		const { navigation } = this.props
		const targetHid = navigation.getParam('targetHid', '0')
		const conversation = navigation.getParam('conversation', {})

		navigation.setParams({ title: conversation.partnerName })
		this.props.fetchMessages(targetHid, conversation.id)
	}

	render() {
		return (
			<ScrollView
				contentContainerStyle={styles.scrollViewContainer}
				refreshControl={
					<RefreshControl
					// refreshing={this.props.isLoadingConversations}
					// onRefresh={this.refreshConversations}
					/>
				}
			>
				<NavigationEvents />
			</ScrollView>
		)
	}
}

MessagePage.propTypes = {
	fetchMessages: PropTypes.func.isRequired,
	navigation: PropTypes.object.isRequired
}

const styles = EStyleSheet.create({
	scrollViewContainer: {
		backgroundColor: 'white',
		flexGrow: 1
	},
	errorTextContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	errorText: {
		fontSize: '1.2rem'
	},
	noMessageText: {
		fontSize: '1.2rem',
		textAlign: 'center',
		fontFamily: 'Lato-Regular',
		paddingTop: '2rem'
	},
	palmTreeImage: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		width: 256,
		height: 256
	},
	newMessageContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: '0.8rem'
	}
})

const mapStateToProps = () => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchMessages: () => dispatch(() => {})
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MessagePage)

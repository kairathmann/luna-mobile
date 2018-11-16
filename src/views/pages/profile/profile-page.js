import PropTypes from 'prop-types'
import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import HeaderImageScrollView, {
	TriggeringView
} from 'react-native-image-header-scroll-view'

export class ProfilePage extends React.Component {
	render() {
		return (
			<HeaderImageScrollView
				headerImage={{ uri: this.props.profile.avatarUrl }}
			>
				<View style={{ height: 1000 }}>
					<TriggeringView onHide={() => {}}>
						<Text>Scroll Me!</Text>
					</TriggeringView>
				</View>
			</HeaderImageScrollView>
		)
	}
}

ProfilePage.propTypes = {
	navigation: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = () => {
	return {
		profile: {}
	}
}

const mapDispatchToProps = () => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfilePage)

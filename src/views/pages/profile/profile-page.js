import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

export class ProfilePage extends React.Component {
	render() {
		return <View />
	}
}

ProfilePage.propTypes = {
	navigation: PropTypes.object.isRequired
}

const mapStateToProps = () => {
	return {}
}

const mapDispatchToProps = () => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfilePage)

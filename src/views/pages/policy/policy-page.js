import PropTypes from 'prop-types'
import React from 'react'
import { Text, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Answers } from 'react-native-fabric'

export class PolicyPage extends React.Component {
	componentDidMount() {
		Answers.logContentView('Policy Page')
	}

	render() {
		return (
			<ScrollView>
				<Text style={styles.headerText}>Privacy Policy</Text>
			</ScrollView>
		)
	}
}

PolicyPage.propTypes = {
	navigation: PropTypes.object.isRequired
}

const styles = EStyleSheet.create({
	headerText: {
		textAlign: 'center',
		marginTop: 16,
		marginBottom: 16
	},
	normalText: {
		color: '#383838',
		marginBottom: 16,
		textAlign: 'center',
		fontWeight: '300'
	}
})

export default PolicyPage

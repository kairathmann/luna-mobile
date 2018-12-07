import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Answers } from 'react-native-fabric'

export class TermsPage extends React.Component {
	componentDidMount() {
		Answers.logContentView('Manage Profile Page')
	}

	render() {
		return (
			<ScrollView>
				<Text style={styles.headerText}>Terms of service</Text>
			</ScrollView>
		)
	}
}

TermsPage.propTypes = {
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

export default TermsPage

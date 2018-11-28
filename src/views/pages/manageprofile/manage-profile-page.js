import { H3, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'
import Button from '../../../components/Button/Button'
import { PAGES_NAMES } from '../../../navigation'

export class ManageProfilePage extends React.Component {
	render() {
		return (
			<React.Fragment>
				<ScrollView style={{ padding: 8 }}>
					<H3 style={styles.headerText}>{I18n.t('manage_page.disable')}</H3>
					<Text style={styles.normalText}>
						{I18n.t('manage_page.disable_text')}
					</Text>
					<Button
						text={I18n.t('manage_page.disable_button')}
						onPress={() =>
							this.props.navigation.navigate(PAGES_NAMES.MANAGE_DISABLE)
						}
					/>

					<H3 style={styles.headerText}>{I18n.t('manage_page.delete')}</H3>
					<Text style={styles.normalText}>
						{I18n.t('manage_page.delete_text')}
					</Text>
					<Button
						text={I18n.t('manage_page.delete_button')}
						onPress={() =>
							this.props.navigation.navigate(PAGES_NAMES.MANAGE_DELETE)
						}
					/>
				</ScrollView>
			</React.Fragment>
		)
	}
}

ManageProfilePage.propTypes = {
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

export default ManageProfilePage

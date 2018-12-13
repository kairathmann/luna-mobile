import React from 'react'
import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Provider } from 'react-redux'
import { Root } from 'native-base'
import 'moment/locale/pl'
import 'moment/locale/de'
import configureApi from './src/config/config'
import { AppStackNavigatorWithGlobalSupport } from './src/navigation'
import configureStore from './src/store'

import { COLORS } from './src/styles'

configureApi()
const store = configureStore()

const width = Dimensions.get('window').width
EStyleSheet.build({
	$rem: width > 340 ? 18 : 16,
	$primaryColor: COLORS.LUNA_PRIMARY_COLOR,
	$primaryBackgroundColor: COLORS.LUNA_BACKGROUND_COLOR,
	$lunaNotificationCircle: COLORS.LUNA_NOTIFICATION_CIRCLE_COLOR
})

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Root>
					<AppStackNavigatorWithGlobalSupport />
				</Root>
			</Provider>
		)
	}
}

import React from 'react'
import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Provider } from 'react-redux'
import configureApi from './src/config/config'
import { AppStackNavigator } from './src/navigation'
import { navigationService } from './src/services'
import configureStore from './src/store'

import { COLORS } from './src/styles'

configureApi()
const store = configureStore()

const width = Dimensions.get('window').width
EStyleSheet.build({
	$rem: width > 340 ? 18 : 16,
	$primaryColor: COLORS.LUNA_PRIMARY_COLOR
})

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppStackNavigator
					ref={navigatorRef => {
						navigationService.setTopLevelNavigator(navigatorRef)
					}}
				/>
			</Provider>
		)
	}
}

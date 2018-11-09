import { NavigationActions } from 'react-navigation'

let _navigator

export const setTopLevelNavigator = navigatorRef => {
	console.log('I WAS HERE')
	_navigator = navigatorRef
}

export const dispatch = action => {
	_navigator.dispatch(action)
}

export const navigate = (routeName, params) => {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params
		})
	)
}

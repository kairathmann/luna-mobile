import EStyleSheet from 'react-native-extended-stylesheet'
import authStyles from './authStyles'
import * as COLORS from './colors'
import flowStyles from './flowStyles'

const styles = EStyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: 'white'
	},
	underline: {
		textDecorationLine: 'underline'
	},
	errorText: {
		color: 'red',
		textAlign: 'center'
	}
})

const auth = EStyleSheet.create(authStyles)
const flow = EStyleSheet.create(flowStyles)

export { COLORS, styles, auth, flow }

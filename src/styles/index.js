import EStyleSheet from 'react-native-extended-stylesheet'
import authStyles from './authStyles'
import * as COLORS from './colors'

const styles = EStyleSheet.create({
	underline: {
		textDecorationLine: 'underline'
	}
})

const auth = EStyleSheet.create({ authStyles })

export { COLORS, styles, auth }

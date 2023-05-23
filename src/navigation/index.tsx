import { NavigationContainer } from '@react-navigation/native'
import { Routing } from './root-navigator'
export const CoreNavigator = () => {
	return (
		<NavigationContainer>
			<Routing />
		</NavigationContainer>
	)
}

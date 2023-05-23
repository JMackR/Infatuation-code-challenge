import { createStackNavigator } from '@react-navigation/stack'
import { RootNavModel } from './root-nav-model'
import { NavigableRoute } from './routes'
/**
 * Routing for the app.
 * @name Routing
 *
 * @returns {React.ReactNode}
 */
const Stack = createStackNavigator()

export const Routing = () => {
	return (

		<Stack.Navigator initialRouteName={NavigableRoute.Tabs} screenOptions={{ headerShown: false }}>
			{RootNavModel.map(({ name, component, }) => (
				<Stack.Screen key={name} name={name} component={component} />
			))}
		</Stack.Navigator>
	)
}

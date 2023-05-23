import { NavigableRoute } from './routes'
import { TransitionSpecs } from '@react-navigation/stack'
import { SearchScreen, FavoritesScreen } from '../screens'
import { TabNavigator } from './tab-navigator'

export const RootNavModel = [
	{
		name: NavigableRoute.Tabs,
		component: TabNavigator,
	},


]

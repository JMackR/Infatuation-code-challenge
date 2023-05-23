
import { FavoritesScreen, SearchScreen } from '../../screens'
import { TransitionSpecs } from '@react-navigation/stack'
import { NavigableRoute } from '../routes'

export const TabRouteModel = [
	{
		name: NavigableRoute.Search,
		component: SearchScreen,
		options: { title: 'Search', headerShown: false, unmountOnBlur: true }
	},
	{
		name: NavigableRoute.Favorites,
		component: FavoritesScreen,
		options: { title: 'Favorites', headerShown: false, unmountOnBlur: true },
		screenOptions: {
			transitionSpec: {
				open: TransitionSpecs.TransitionIOSSpec,
				close: TransitionSpecs.TransitionIOSSpec,
			},
		},
	},
]

import values from 'lodash/values'

export enum NavigableRoute {
	Tabs = 'tabs',
	Search = 'search-screen',
	Favorites = 'favorites-screen',
}

export const navigableRoutes: string[] = values(NavigableRoute)

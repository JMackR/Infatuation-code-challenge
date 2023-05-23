import type { StackScreenProps } from '@react-navigation/stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NavigableRoute } from './routes'
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamList = {
	[NavigableRoute.Tabs]: NavigatorScreenParams<TabParamList>
}
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>

export type TabParamList = {
	[NavigableRoute.Search]: undefined
	[NavigableRoute.Favorites]: undefined

}
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
	BottomTabScreenProps<TabParamList, T>,
	RootStackScreenProps<keyof RootStackParamList>
>

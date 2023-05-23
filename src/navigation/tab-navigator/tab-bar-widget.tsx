import React, { memo } from 'react'
import { View, StyleSheet, BackHandler } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TabBarButton } from './tab-bar-button'


export const TabBarHeight = 62
const TabStyles = StyleSheet.create({
	tabBar: {
		flexDirection: 'column',
		height: TabBarHeight,
		elevation: 1,
	},
	tabContainer: { flex: 1, flexDirection: 'row', alignItems: 'flex-end' },
})

export const TabBarWidget = memo((props: BottomTabBarProps) => {

	const { bottom } = useSafeAreaInsets()
	const { navigation } = props

	const onBackPress = () => {
		if (props.state.history.length === 1) {
			return true
		}
		return false
	}

	BackHandler.addEventListener('hardwareBackPress', onBackPress)
	return (
		// The container for the whole tab bar
		<View
			style={[TabStyles.tabBar, { marginBottom: bottom, borderTopWidth: 1 }]}
			testID='tab-navigator.tab-bar-widget'
			accessibilityLabel='tab-navigator.tab-bar-widget'
		>
			{/* The bar under the slider for the actual tabs */}
			<View style={TabStyles.tabContainer}>
				{/* Build the tab buttons from the routes */}
				{props.state.routes.map((route, index: number) => {
					const { options } = props.descriptors[route.key]
					const label = options.title || route.name
					const isFocused = props.state.index === index
					const icon = options.tabBarIcon! as (props: { focused: boolean }) => React.ReactNode
					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						})

						if (!isFocused && !event.defaultPrevented) {
							// The `merge: true` option makes sure that the params inside the tab screen are preserved
							navigation.navigate(route.name)
						}
					}

					return (
						<TabBarButton
							key={index}
							index={index}
							onPress={onPress}
							active={isFocused}
							labelText={label}
							testID={label}
						/>
					)
				})}
			</View>
		</View>
	)
})

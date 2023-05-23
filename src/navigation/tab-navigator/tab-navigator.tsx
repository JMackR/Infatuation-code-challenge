import React from 'react'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabBarWidget } from './tab-bar-widget'
import { TabRouteModel } from './tab-route-model'
import { NavigableRoute } from '../routes'

const Tabs = createBottomTabNavigator()
const tabBarFunc = (props: BottomTabBarProps) => <TabBarWidget {...props} />

export const TabNavigator = () => (
	<Tabs.Navigator tabBar={tabBarFunc} initialRouteName={NavigableRoute.Search}>
		{TabRouteModel.map(({ name, options, component }) => (
			<Tabs.Screen key={name} name={name} component={component} options={options} />
		))}
	</Tabs.Navigator>
)


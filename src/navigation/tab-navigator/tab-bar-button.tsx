import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const Styles = StyleSheet.create({
	tabButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

interface TabBarButtonProps {
	onPress: () => void
	active: boolean
	labelText: string
	index: number
	testID?: string
}

const TabBarButton = (props: TabBarButtonProps) => {
	const { onPress, labelText, index, testID } = props
	const textColorKey = props.active ? { fontFamily: 'Lato-Bold' } : { fontFamily: 'Lato-Light' }

	return (
		<TouchableOpacity
			activeOpacity={1}
			style={[Styles.tabButton]}
			onPress={onPress}
			accessibilityRole='button'
			testID={testID || `tab-navigator.tab-bar-button.${index}`}
		>
			<Text style={textColorKey}>{labelText}</Text>


		</TouchableOpacity>
	)
}

export { TabBarButton }

import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SwipeableCallbackContext } from './swipeable-row'
import { SwipeableActionProps } from './swipeable-row.types'

export const SwipeableAction: React.FC<SwipeableActionProps> = props => {
  const { children, onPress, testID } = props
  const { hideActions } = useContext(SwipeableCallbackContext)
  const press = () => {
    onPress && onPress()
    hideActions && hideActions()
  }

  return (
    <TouchableOpacity
      style={{ flexGrow: 1, marginRight: 15, marginBottom: 5, overflow: "hidden", borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
      onPress={press}
      testID={'swipe-onPress'}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 1,
          backgroundColor: "red",
          borderRadius: 0,
        }}
        testID={testID}
        accessibilityLabel={testID} />
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: "center" }} >
        {children}
      </View>

    </TouchableOpacity>
  )
}

import React, { createContext, useRef } from 'react'
import { View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SwipeableRowProps } from './swipeable-row.types'

export const SwipeableCallbackContext = createContext({
  hideActions: () => any
})

export const SwipeableRow: React.FC<SwipeableRowProps> = props => {
  const { children, renderRightActions, renderLeftActions, } = props
  const element = useRef() as any
  const hideActions = () => {
    element.current && element.current.close()
  }


  return (
    <SwipeableCallbackContext.Provider value={{ hideActions }}>
      <Swipeable
        ref={element}
        friction={5}
        leftThreshold={40}
        rightThreshold={40}
        renderLeftActions={() => <View>{renderLeftActions}</View>}
        renderRightActions={() => <View>{renderRightActions}</View>}>

        {children}
      </Swipeable>
    </SwipeableCallbackContext.Provider>
  )
}

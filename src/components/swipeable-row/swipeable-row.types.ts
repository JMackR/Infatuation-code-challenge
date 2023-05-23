
import { ReactNode } from 'react'

export interface SwipeableActionProps {
  children: JSX.Element
  onPress?: () => void
  testID?: string
}
export interface SwipeableRowProps {
  children: ReactNode
  horizontal?: 'left' | 'right' | 'center'
  renderLeftActions?: ReactNode
  renderRightActions?: ReactNode
}

export interface WithSwipeableCallbacks {
  close: () => void
  openLeft: () => void
  openRight: () => void
}

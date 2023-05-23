import type { LocalSVGSource } from '../svgs'

export interface HeaderBarItem {
    title?: string
    image?: object
    color?: string
    icon?: LocalSVGSource
    pressHandler?: () => void
    tint?: string
    rotateIcon?: string
    testID?: string
}

/**
 * TODO bring back in the required colorTint prop
 */
export interface HeaderBarProps {
    logo?: object
    title?: string
    colorTint?: string
    rightItems?: HeaderBarItem[]
    barItemsTint?: string
    showShadow?: boolean
    testID?: string

}

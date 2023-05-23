import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SVG, LocalSVGSource } from '../svgs'
import { HeaderBarProps, HeaderBarItem } from './header-types'
import { LogoIcon } from '../../assets/svgs/image-catalog'

enum LAYOUTS {
    HeaderHeight = 65,
    RootHeaderTitleTopSpacing = 4,
    RootHeaderTitleHorizontal = 2,
    NonRootHeaderBarTitleTopSpacing = 4,
    HeaderBottomSpacing = 2,
    HeaderItemSpacing = 2,
    HeaderItemIconSize = 24,
    HeaderItemTouchTarget = 40,
}

export const Header: React.FC<HeaderBarProps> = ({
    logo,
    title,
    rightItems,
    barItemsTint,
    testID,
}) => {

    return (
        <View
            style={{ flexBasis: LAYOUTS.HeaderHeight, borderBottomWidth: 3, width: '100%', borderColor: '#000000', marginBottom: 5 }}
            testID={'header'}>
            <View
                style={styles.header}
                testID={testID}
            >
                {title && <Text style={styles.title}>{title}</Text>}
                {logo && (
                    <View style={styles.logo}>
                        <SVG localSVG={LogoIcon} />
                    </View>
                )}
            </View>
            <HeaderItems items={rightItems} direction="row-reverse" barItemsTint={barItemsTint} />
        </View>
    )
}

interface HeaderItemStackProps {
    items: HeaderBarItem[] | undefined
    direction: 'row' | 'row-reverse'
    barItemsTint?: string
}

const HeaderItems = (props: HeaderItemStackProps) => {
    const { items, direction, barItemsTint } = props
    if (!items || items.length === 0) {
        return null
    }
    return (
        <View
            style={styles.items}
            testID={"right-items"}
        >

            <Text style={styles.sortTitle}>Sort by Stars</Text>
            <View style={styles.barItems} >
                {items.map((item: HeaderBarItem, index: number) => (
                    <HeaderItem
                        item={item}
                        index={index}
                        key={index}
                        direction={direction}
                        barItemsTint={barItemsTint}

                    />
                ))}
            </View>
        </View>
    )
}

interface HeaderItemProps {
    item: HeaderBarItem
    index: number
    direction: 'row' | 'row-reverse'
    barItemsTint?: string

}

const HeaderItem = (props: HeaderItemProps) => {
    const { item, index, direction, barItemsTint } = props
    const { title, icon, tint, pressHandler, testID, rotateIcon } = item
    const resizedSVG = resizeSVGForHeaderBarItem(icon)
    const colorTint = tint || barItemsTint || 'white'

    return (
        <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
                onPress={pressHandler}
                testID={'header-item'}
                style={[styles.item, { flexDirection: direction, }]}>
                <View style={{ alignItems: "center", transform: [{ rotate: rotateIcon ? rotateIcon : '0deg' }], }}>{!!resizedSVG && <SVG localSVG={resizedSVG} tint={colorTint} />}</View>

            </TouchableOpacity>
            {!!title && <Text style={{ color: "#000000" }}  >{title}</Text>}
        </View>
    )
}

const resizeSVGForHeaderBarItem = (svgSource: LocalSVGSource | undefined) => {
    if (svgSource) {
        return {
            SVG: svgSource.SVG,
            size: {
                width: svgSource?.size?.width || LAYOUTS.HeaderItemIconSize,
                height: svgSource?.size?.height || LAYOUTS.HeaderItemIconSize,
            },
        }
    }
    return undefined
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: LAYOUTS.RootHeaderTitleTopSpacing,
        bottom: LAYOUTS.HeaderBottomSpacing,
        left: LAYOUTS.NonRootHeaderBarTitleTopSpacing,
        right: LAYOUTS.NonRootHeaderBarTitleTopSpacing,
        opacity: 1,
        borderRadius: 0,
        alignItems: "center"
    },
    title: {
        textAlign: "center"
    },
    logo: {
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    items: {
        flexShrink: 1,
        flexGrow: 0,
        position: 'absolute',
        top: LAYOUTS.RootHeaderTitleTopSpacing,
        bottom: LAYOUTS.HeaderBottomSpacing,
        left: undefined,
        right: LAYOUTS.RootHeaderTitleHorizontal,
        opacity: 1,
        alignItems: "center",
        borderRadius: 0,
    },
    sortTitle: {
        fontSize: 10
    },
    barItems: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        rowGap: 2,
    },
    item: {
        minWidth: LAYOUTS.HeaderItemTouchTarget,
        height: LAYOUTS.HeaderItemTouchTarget,
        alignItems: 'center',
        justifyContent: 'center',

    }


})
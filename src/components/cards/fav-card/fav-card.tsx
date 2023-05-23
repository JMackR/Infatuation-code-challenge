import React, { FC, useCallback } from 'react'
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import { CoreTypes } from '../../../hooks'
import { SwipeableAction, SwipeableRow } from '../../swipeable-row'
import { DeleteIcon, SwipeIcon } from '../../../assets/svgs/image-catalog'
import { SVG } from '../../svgs'
import { CoreCard } from '../core-card'
import {
    GestureHandlerRootView,
} from 'react-native-gesture-handler'

export interface FavCardProps extends CoreTypes {
    deleteFav: (id: string) => void
    testID: string
}

export const FavCard: FC<FavCardProps> = (props) => {
    const {
        id,
        deleteFav,
        testID
    } = props;

    const handleDeleteInternal = useCallback(() => {
        deleteFav && deleteFav(id)
    }, [deleteFav, props])

    const DeleteAction = (
        <SwipeableAction key={id} onPress={handleDeleteInternal} testID={testID}>
            <View style={{ flexShrink: 1, flexDirection: 'column', alignItems: 'center', margin: 20, }}>
                <SVG localSVG={{ ...DeleteIcon, size: { width: 20, height: 20 } }} tint={"#ffffff"} testID="delete-icon" />
                <Text style={styles.deleteText} testID={'delete'}>
                    Delete
                </Text>
            </View>
        </SwipeableAction>
    )

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SwipeableRow renderRightActions={[DeleteAction]}>
                <View style={styles.cardContainer} >
                    <View style={styles.mainContainer}>
                        <CoreCard {...props} />
                        <View style={[styles.swipeIcon]}>
                            <SVG localSVG={SwipeIcon} tint={'#C2BABA'} testID='swipe-icon' />
                        </View>

                    </View>
                </View>
            </SwipeableRow>
        </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        marginBottom: 5,
        flexDirection: 'row',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 15
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    swipeIcon: {
        justifyContent: "center",
        marginRight: 10,
    },
    deleteText: {
        color: "#fff",
        marginVertical: 2,
        fontFamily: "Lato-Bold",
    }
})

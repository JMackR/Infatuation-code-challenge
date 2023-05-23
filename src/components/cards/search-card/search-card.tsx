import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { ReposTypes } from '../../../hooks';
import { SVG } from '../../svgs';
import { FavoriteIcon } from '../../../assets/svgs/image-catalog';
import { CoreCard } from '../core-card';

const { height } = Dimensions.get('window');

export interface SearchCardProps extends ReposTypes {
    saveToFavorites: (props: ReposTypes) => void
    testID: string
}

export const SearchCard = (props: SearchCardProps) => {
    const {
        saveToFavorites,
        testID,
        ...rest
    } = props;

    return (
        <TouchableOpacity style={styles.cardContainer} testID={testID} onPress={() => saveToFavorites(rest)} accessibilityLabel={`${testID}-user-container`}>
            <View style={styles.mainContainer}>
                {props.avatarUrl && <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: props.avatarUrl,
                        }}
                        testID='avatar-url'
                    />
                </View>}
                <CoreCard {...props} />
                <View style={[styles.favIcon]}>
                    <SVG localSVG={FavoriteIcon} tint={props.isFav ? '#051BFC' : '#C2BABA'} testID='fav-icon' />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 15
    },
    imageContainer: {
        margin: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.95,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: "center"
    },
    image: {
        height: height * 0.1,
        aspectRatio: 8 / 12,
        alignItems: "center",
        resizeMode: "contain"
    },

    mainContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    favIcon: {
        marginRight: 10,
        justifyContent: "center"
    }


});

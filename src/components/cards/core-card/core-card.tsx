import { View, Text, StyleSheet, Dimensions, } from 'react-native'
import { CoreTypes } from '../../../hooks';

const { height } = Dimensions.get('window');

export const CoreCard = (props: CoreTypes) => {
    const {
        fullName,
        createdAt,
        stargazersCount,
        language,
        url,
    } = props;

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.rowContainer}>
                <Text style={styles.title}>Name:</Text>
                <Text style={styles.subText} testID='fullName'>{fullName}</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.title}>Stargazers Count:</Text>
                <Text style={styles.subText} testID='stargazersCount'>{stargazersCount}</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.title}>Language:</Text>
                <Text style={styles.subText} testID='language'>{language}</Text>
            </View>
            <View style={styles.rowContainer} >
                <Text style={styles.title}>Year Created:</Text>
                <Text style={styles.subText} testID='createdAt'>{new Date(createdAt).getFullYear()}</Text>
            </View>
            <View style={[styles.rowContainer]}>
                <Text style={styles.title}>Link:</Text>
                <View style={[{ flex: 1, marginRight: 15 }]}>
                    <Text style={styles.subText} testID='url'>{url}</Text>
                </View>
            </View>
        </View>
    )
}

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
    bodyContainer: {
        flex: 1,
        marginLeft: 5,
        flexDirection: 'column',
    },
    title: {
        fontFamily: "Lato-Bold",
        fontSize: 12,
        flexWrap: 'wrap',
    },
    subText: {
        fontFamily: "Lato-Regular",
        fontSize: 12,
    },
    rowContainer: {
        flex: 1,
        gap: 10,
        marginVertical: 2,
        flexDirection: 'row',
    },
    favIcon: {
        marginRight: 10,
        justifyContent: "center"
    }


});

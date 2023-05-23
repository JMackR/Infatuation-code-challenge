import { useEffect, FC, useState } from 'react'
import { View, FlatList, ListRenderItemInfo, StyleSheet, Text } from 'react-native'
import { NavigableRoute } from '../navigation/routes'
import { TabScreenProps } from '../navigation/types'
import { CoreTypes, useFavorites, } from '../hooks'
import { EmptyState, FavCard, FavCardProps, } from '../components'
import { DownChevronIcon, LogoIcon } from '../assets/svgs/image-catalog'
import { Header } from '../components/header'

export const FavoritesScreen: FC<TabScreenProps<NavigableRoute.Favorites>> = ({ navigation }) => {
    const { Get, Delete, data, loading, error } = useFavorites()
    const [sortOrder, setOrder] = useState(true)

    useEffect(() => {
        Get()
    }, [])

    const deleteFavorite = (id: string) => {
        Delete(id)
    }
    const sortButtons: any[] | undefined = []
    sortButtons.push({
        icon: DownChevronIcon,
        testID: 'sortUp',
        pressHandler: () => {
            setOrder(true)
        },
    }, {
        rotateIcon: '-180deg',
        icon: DownChevronIcon,
        testID: 'sortDown',
        pressHandler: () => {
            setOrder(false)
        },
    })

    const favs = data?.sort((a, b) => sortOrder ? b?.stargazersCount - a?.stargazersCount : a?.stargazersCount - b?.stargazersCount)

    return (
        <View style={styles.container} testID="favorites-screen">
            <Header title="The Infatuation" logo={LogoIcon} rightItems={sortButtons} />
            {loading && <View style={styles.loading}><Text style={styles.message} testID='loading-text' accessibilityLabel={"loading"}>Loading...</Text></View>}
            {error && !loading && (
                <View style={styles.loading}><Text style={[styles.message, styles.error]} testID="error-message">
                    Houston we have a problem.
                </Text></View>
            )
            }
            <View>
                <FlatList
                    data={favs}
                    keyExtractor={(item, index) => `${index}-${item}`}
                    renderItem={({ item, index }: ListRenderItemInfo<CoreTypes>) => (
                        <FavCard {...item} deleteFav={deleteFavorite} testID={`fav-item${index}`} />
                    )}
                    ListEmptyComponent={() => (<View style={styles.emptyComponent}><EmptyState
                        title="You haven't favorited any repos yet"
                        message="Why not try to find a repo you like?"
                        actionLabel="Start Searching"
                        onAction={() => navigation.navigate(NavigableRoute.Search)}
                    /></View>)}
                />
            </View>
        </View>
    );


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    thinSeparator: {
        width: "100%",
        height: 1
    },
    searchContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    searchTextInput: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
        color: 'black'
    },
    emptyComponent: {
        marginTop: 50
    },
    message: {
        fontSize: 18,
        padding: 8,
    },
    error: {
        color: 'red',
        fontSize: 18,
        padding: 8,
    },
    loading: {
        justifyContent: 'center',
        alignItems: "center"
    }
})
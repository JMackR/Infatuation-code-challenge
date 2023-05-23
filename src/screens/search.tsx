import { useState, FC, useRef, useCallback, useEffect } from 'react'
import { View, FlatList, ListRenderItemInfo, StyleSheet, TextInput, Text, Alert } from 'react-native'
import { debounce } from 'lodash';
import { ReposTypes, useFavorites, useSearch } from '../hooks'
import { EmptyState, SearchCard, SearchCardProps, TextEntry } from '../components'
import { LogoIcon } from '../assets/svgs/image-catalog'
import { Header } from '../components/header'

export const SearchScreen: FC = () => {
    const { fetchData, data, loading, error } = useSearch()
    const { Post, Get, data: favs } = useFavorites()
    const [text, setText] = useState<string | undefined>(undefined)
    const inputRef = useRef<TextInput>(null)

    const getFavs = async () => {
        const result = await Get()
        data.map((item, idx) => {
            const isFav = result.some(o => o.id == item.id)
            data[idx].isFav = isFav
        })
    }

    useEffect(() => {
        if (favs?.length < 1)
            getFavs()
    }, [favs?.length])

    const searchInput = (input: string | undefined) => {
        fetchData({ input })
    }
    const saveToFavorites = (props: ReposTypes) => {
        const { avatarUrl, ...item } = props
        if (favs?.length <= 10) {
            Post(JSON.stringify(item))
        } else {
            Alert.alert("YO", `C'mon man, you can't have more than 10 favs per person`, [{ text: 'OK', }])
        }

    }
    const debouncedChangeHandler = useCallback(
        debounce(searchInput, 200)
        , [])

    return (
        <View style={styles.container} testID="search-screen">
            <Header title="The Infatuation" logo={LogoIcon} />

            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <TextEntry
                    text={text}
                    ref={inputRef}
                    hint={"Search"}
                    textChangeHandler={text => {
                        debouncedChangeHandler(text)
                        setText(text)
                    }}
                    testID="search"
                    onClear={() => {
                        debouncedChangeHandler(undefined)
                        setText(undefined)
                    }}
                />
            </View>
            {loading && <View style={styles.loading}><Text style={styles.message} testID='loading-text' accessibilityLabel={"loading"}>Loading...</Text></View>}
            {error && !loading && (
                <View style={styles.loading}><Text style={[styles.message, styles.error]} testID="error-message">
                    Houston we have a problem.
                </Text></View>
            )
            }
            <View>
                <FlatList
                    testID="repo-list"
                    data={data}
                    keyExtractor={(item, index) => `${index}-${item}`}
                    renderItem={({ item, index }: ListRenderItemInfo<ReposTypes>) => (
                        <SearchCard key={`${index}-${item}`} {...item} saveToFavorites={saveToFavorites} testID={`repo-item${index}`} />
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyComponent}>
                            <EmptyState
                                title="You haven't searched any repos yet"
                                message="Why not try to find a repo you like?"
                                actionLabel="Start Searching"
                                onAction={() => inputRef.current?.focus()}
                            />
                        </View>
                    )}
                />


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
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
        color: 'blacl'
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
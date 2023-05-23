import { forwardRef, useImperativeHandle, useRef } from 'react'
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputEndEditingEventData, TouchableOpacity } from 'react-native'
import { TextEntryProps, TextEntryRef } from './text-entry-types'
import { SVG } from '../svgs'
import { ClearIcon, SearchIcon } from '../../assets/svgs/image-catalog'

export const TextEntry = forwardRef<TextEntryRef, TextEntryProps>((props, ref) => {
    const {
        text,
        hint,
        returnKeyType,
        keyboardType,
        autoCompleteType,
        autoCorrect,
        keyPressHandler,
        textChangeHandler,
        endEditingHandler,
        blurHandler,
        focusHandler,
        onSubmitEditing,
        testID,
        returnKeyLabel,
        onPressIn,
        onClear
    } = props

    const input = useRef<TextInput>(null)

    const keyPressFunc = (e: { nativeEvent: { key: string } }) => {
        if (keyPressHandler !== undefined) {
            keyPressHandler(e.nativeEvent.key)
        }
    }

    const endEditingFunc = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        if (endEditingHandler !== undefined) {
            endEditingHandler(e.nativeEvent.text)
        }
    }
    const handleSubmitEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        if (onSubmitEditing) {
            onSubmitEditing(e.nativeEvent.text)
        }
    }

    const focusFunc = () => {

        focusHandler && focusHandler()
    }

    const blurFunc = () => {
        blurHandler && blurHandler()
    }

    const focus = () => {
        if (input.current !== null) {
            input.current.focus()
        }
    }

    const blur = () => {
        if (input.current !== null) {
            input.current.blur()
        }
    }

    useImperativeHandle(ref, () => ({
        focus,
        blur,

    }))


    return (
        <View style={styles.mainContainer}>
            <View style={styles.border}>
                <View style={styles.innerContainer}>
                    <View style={styles.leadingIcon}>
                        <SVG localSVG={{ ...SearchIcon, size: { width: 20, height: 20 } }} tint={'#cccccc'} testID="search-icon" />
                    </View>
                    <TextInput
                        style={styles.textentry}
                        ref={input}
                        underlineColorAndroid={'transparent'}
                        autoComplete={autoCompleteType}
                        autoCorrect={autoCorrect}
                        value={text}
                        onPressIn={onPressIn}
                        onKeyPress={keyPressFunc}
                        onEndEditing={endEditingFunc}
                        onFocus={focusFunc}
                        onBlur={blurFunc}
                        onSubmitEditing={handleSubmitEditing}
                        keyboardType={keyboardType}
                        returnKeyType={returnKeyType}
                        placeholder={hint}
                        returnKeyLabel={returnKeyLabel}
                        onChangeText={textChangeHandler}
                        testID={testID || 'text-entry'}
                        accessibilityLabel={testID || 'text-entry'}
                    />
                    {onClear && (
                        <View style={styles.clearIcon}>
                            <SVG localSVG={{ ...ClearIcon, size: { width: 20, height: 20 } }} tint={'#cccccc'} testID="search-icon" onPress={onClear} />
                        </View>
                    )
                    }
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    border: {
        flexDirection: 'column',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 15
    },
    innerContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        margin: 12,
        alignItems: "center"
    },
    leadingIcon: {
        marginRight: 8
    },
    clearIcon: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    textentry: {
        width: "90%",
        flex: 0,
        flexDirection: 'row',
        color: "#000000",
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: "Lato-Regular",
        padding: 0,
        margin: 0,
        marginRight: 10,
        alignSelf: 'stretch',
        textAlign: 'left',
        textAlignVertical: 'auto',
    },
})
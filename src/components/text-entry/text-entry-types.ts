import { ViewStyle, TextStyle } from "react-native";

export interface TextEntryRef {
    focus: () => void
    blur: () => void
}

export interface TextEntryProps {
    ref?: React.RefObject<TextEntryRef>
    onPressIn?: () => void
    returnKeyLabel?: string
    /**
     * This is an Android only react property to disable text input auto suggestion.
     */
    autoCompleteType?:
    | 'off'
    | 'username'
    | 'password'
    | 'email'
    | 'name'
    | 'tel'
    | 'street-address'
    | 'postal-code'
    | 'cc-number'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'

    text?: string
    /**
     * Text displayed when no content has been entered in the text box.
     */
    hint?: string
    /**
     * Indicates the type of keyboard that the user should see when they begin using the input field.
     */
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad'

    /**
     * Sets the input mode property of the input
     */
    inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'

    autoCorrect?: boolean
    /**
     * Callback with key pressed
     */
    keyPressHandler?: (key: string) => void

    /**
     * Callback with the input whenever the user enters a value into the field.
     */
    textChangeHandler?: (text?: string) => void

    /**
     * Callback with the input whenever the user ends editing.
     */
    endEditingHandler?: (text: string) => void

    /**
     * Callback when control loses focus
     */
    blurHandler?: () => void

    /**
     * Callback when control gains focus
     */
    focusHandler?: () => void
    /**
     * Callback when control's submit button is pressed
     */
    onSubmitEditing?: (text: string) => void

    onPaste?: (event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void

    onClear?: () => void
    /**
     * enum('default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call')
     * Determines how the return key should look.
     */
    returnKeyType?:
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'none'
    | 'previous'
    | 'default'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call'
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID?: string
    styles?: { container?: ViewStyle; input?: TextStyle }
    /**
     * Will disable the input if set to true
     */
    inputDisabled?: boolean
}


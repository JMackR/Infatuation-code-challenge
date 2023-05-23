import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export type EmptyStateProps = {
    title?: string
    message?: string
    actionLabel?: string
    onAction: () => void
}
export const EmptyState = ({
    title,
    message,
    actionLabel,
    onAction
}: EmptyStateProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title} testID={'title'}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={onAction}
                testID={'button'}
            >
                <Text style={styles.buttonText}>{actionLabel}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 200,
        marginBottom: 10
    },
    title: {
        fontSize: 14,
        color: '#000000',
        fontFamily: "Lato-Bold",
        marginBottom: 0
    },
    message: {
        marginTop: 0,
        fontFamily: "Lato-Regular",
        fontSize: 12,
        color: '#000000',
        marginBottom: 14
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 10
    },
    button: {
        backgroundColor: "#000000",
        paddingHorizontal: 30,
        paddingVertical: 16,
        borderRadius: 16
    },
    buttonText: {
        color: "#ffffff",
        fontFamily: "Lato-Bold",
        fontSize: 12,
    }
})


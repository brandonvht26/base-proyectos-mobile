import { View, Text } from 'react-native';

interface DividerProps {
    text?: string;
}

export function Divider({ text }: DividerProps) {
    if (!text) {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: '#CBD2DC',
                    marginVertical: 24,
                }}
            />
        );
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 24,
            }}
        >
            <View style={{ flex: 1, height: 1, backgroundColor: '#CBD2DC' }} />
            <Text
                style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 13,
                    color: '#8A8E94',
                    marginHorizontal: 16,
                }}
            >
                {text}
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#CBD2DC' }} />
        </View>
    );
}

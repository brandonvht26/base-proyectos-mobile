import { View, Text } from 'react-native';

import { colors } from '../../theme/colors';

interface DividerProps {
    text?: string;
}

export function Divider({ text }: DividerProps) {
    if (!text) {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: colors.border,
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
            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            <Text
                style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 13,
                    color: colors.muted,
                    marginHorizontal: 16,
                }}
            >
                {text}
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
        </View>
    );
}

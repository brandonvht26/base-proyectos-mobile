import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';

interface AuthHeaderProps {
    title: string;
    subtitle: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

export function AuthHeader({
    title,
    subtitle,
    icon = 'shield-checkmark',
}: AuthHeaderProps) {
    return (
        <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}
            style={{ alignItems: 'center', marginBottom: 36 }}
        >
            {/* Ícono con fondo */}
            <View
                style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    backgroundColor: '#EBF1FC',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                }}
            >
                <Ionicons name={icon} size={36} color="#3B6FD4" />
            </View>

            {/* Título */}
            <Text
                style={{
                    fontFamily: 'GoogleSansFlex-Bold',
                    fontSize: 28,
                    color: '#1E2A3A',
                    marginBottom: 8,
                }}
            >
                {title}
            </Text>

            {/* Subtítulo */}
            <Text
                style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 15,
                    color: '#8A8E94',
                    textAlign: 'center',
                    lineHeight: 22,
                    paddingHorizontal: 16,
                }}
            >
                {subtitle}
            </Text>
        </MotiView>
    );
}

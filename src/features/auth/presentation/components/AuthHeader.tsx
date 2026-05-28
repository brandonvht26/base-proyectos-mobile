import { View, Text, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { colors } from '../../../../shared/presentation/theme/colors';

interface AuthHeaderProps {
    title: string;
    subtitle: string;
    icon?: keyof typeof Ionicons.glyphMap;
    showBack?: boolean;
}

export function AuthHeader({
    title,
    subtitle,
    icon = 'shield-checkmark',
    showBack = false,
}: AuthHeaderProps) {
    const router = useRouter();

    return (
        <View style={{ paddingTop: showBack ? 24 : 48, paddingBottom: 40, paddingHorizontal: 28 }}>
            {showBack && (
                <MotiView
                    from={{ opacity: 0, translateX: -10 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'timing', duration: 400 }}
                    style={{ marginBottom: 20 }}
                >
                    <Pressable
                        onPress={() => router.back()}
                        style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}
                        hitSlop={8}
                    >
                        <Ionicons name="chevron-back" size={24} color={colors.surface} />
                        <Text
                            style={{
                                fontFamily: 'GoogleSansFlex-Bold',
                                fontSize: 15,
                                color: colors.surface,
                                marginLeft: 4,
                            }}
                        >
                            Volver
                        </Text>
                    </Pressable>
                </MotiView>
            )}

            <MotiView
                from={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                style={{ alignItems: 'center' }}
            >
                <View
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 24,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}
                >
                    <Ionicons name={icon} size={38} color={colors.surface} />
                </View>
            </MotiView>

            <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500, delay: 100 }}
                style={{ alignItems: 'center' }}
            >
                <Text
                    style={{
                        fontFamily: 'GoogleSansFlex-Bold',
                        fontSize: 28,
                        color: colors.surface,
                        marginBottom: 8,
                        textAlign: 'center',
                    }}
                >
                    {title}
                </Text>

                <Text
                    style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 15,
                        color: colors.accentBg,
                        textAlign: 'center',
                        lineHeight: 22,
                        paddingHorizontal: 8,
                    }}
                >
                    {subtitle}
                </Text>
            </MotiView>
        </View>
    );
}

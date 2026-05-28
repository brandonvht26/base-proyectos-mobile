import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '../../src/features/auth/presentation/store/authStore';
import { useAuth } from '../../src/features/auth/presentation/hooks/useAuth';
import { Button } from '../../src/shared/presentation/components/ui/Button';
import { colors } from '../../src/shared/presentation/theme/colors';

export default function HomeScreen() {
    const { user } = useAuthStore();
    const { logout } = useAuth();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 28,
                }}
            >
                <MotiView
                    from={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                >
                    <View
                        style={{
                            width: 88,
                            height: 88,
                            borderRadius: 24,
                            backgroundColor: colors.accentBg,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 24,
                        }}
                    >
                        <Ionicons name="person" size={44} color={colors.accent} />
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
                            fontSize: 28,
                            fontFamily: 'GoogleSansFlex-Bold',
                            color: colors.textPrimary,
                        }}
                    >
                        ¡Bienvenido!
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontFamily: 'Lato-Regular',
                            color: colors.textPrimary,
                            marginTop: 8,
                        }}
                    >
                        {user?.name ?? 'Usuario'}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: 'Lato-Regular',
                            color: colors.muted,
                            marginTop: 4,
                        }}
                    >
                        {user?.email}
                    </Text>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 500, delay: 300 }}
                    style={{ marginTop: 48, width: '100%' }}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: 'Lato-Regular',
                            color: colors.muted,
                            textAlign: 'center',
                            marginBottom: 20,
                        }}
                    >
                        Pantalla principal — será reemplazada por el proyecto del examen
                    </Text>
                    <Button
                        title="Cerrar sesión"
                        variant="outline"
                        icon={<Ionicons name="log-out-outline" size={20} color={colors.textPrimary} />}
                        onPress={logout}
                    />
                </MotiView>
            </View>
        </SafeAreaView>
    );
}

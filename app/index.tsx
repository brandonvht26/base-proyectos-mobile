import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';

import { useAuthStore } from '../src/features/auth/presentation/store/authStore';
import { colors } from '../src/shared/presentation/theme/colors';
import { Button } from '../src/shared/presentation/components/ui/Button';

function SplashScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.accent }}>
            <MotiView
                from={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            >
                <View
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 28,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MotiView
                        from={{ rotate: '0deg' }}
                        animate={{ rotate: '360deg' }}
                        transition={{ type: 'timing', duration: 2000, loop: true }}
                    >
                        <Text style={{
                            fontFamily: 'GoogleSansFlex-Bold',
                            fontSize: 40,
                            color: colors.surface,
                        }}>
                            B
                        </Text>
                    </MotiView>
                </View>
            </MotiView>

            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500, delay: 400 }}
                style={{ marginTop: 28 }}
            >
                <Text style={{
                    fontFamily: 'GoogleSansFlex-Bold',
                    fontSize: 24,
                    color: colors.surface,
                    letterSpacing: 1,
                }}>
                    Base Proyectos
                </Text>
            </MotiView>

            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 500, delay: 800 }}
                style={{ marginTop: 12 }}
            >
                <Text style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 14,
                    color: colors.accentBg,
                }}>
                    Gestiona tus proyectos de forma inteligente
                </Text>
            </MotiView>
        </View>
    );
}

function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.accent }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 28,
                    paddingTop: 48,
                }}
            >
                <MotiView
                    from={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    style={{ alignItems: 'center' }}
                >
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 28,
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 24,
                        }}
                    >
                        <Text style={{
                            fontFamily: 'GoogleSansFlex-Bold',
                            fontSize: 40,
                            color: colors.surface,
                        }}>
                            B
                        </Text>
                    </View>

                    <MotiView
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 200 }}
                        style={{ alignItems: 'center' }}
                    >
                        <Text style={{
                            fontFamily: 'GoogleSansFlex-Bold',
                            fontSize: 32,
                            color: colors.surface,
                            marginBottom: 8,
                        }}>
                            Bienvenido
                        </Text>
                        <Text style={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 16,
                            color: colors.accentBg,
                            textAlign: 'center',
                            lineHeight: 24,
                            paddingHorizontal: 16,
                        }}>
                            Gestiona tus proyectos de forma sencilla y eficiente
                        </Text>
                    </MotiView>
                </MotiView>
            </View>

            <View
                style={{
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    paddingTop: 40,
                    paddingHorizontal: 28,
                    paddingBottom: 48,
                    gap: 12,
                }}
            >
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 500, delay: 400 }}
                >
                    <Button
                        title="Iniciar Sesión"
                        onPress={() => router.push('/auth/login')}
                    />
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 500, delay: 500 }}
                >
                    <Button
                        title="Crear cuenta"
                        onPress={() => router.push('/auth/register')}
                    />
                </MotiView>
            </View>
        </SafeAreaView>
    );
}

export default function Index() {
    const { user, isLoading } = useAuthStore();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        if (isLoading) return;
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, [isLoading]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surface }}>
                <ActivityIndicator size="large" color={colors.accent} />
            </View>
        );
    }

    if (showSplash) {
        return <SplashScreen />;
    }

    if (user) {
        return <Redirect href="/main" />;
    }

    return <WelcomeScreen />;
}

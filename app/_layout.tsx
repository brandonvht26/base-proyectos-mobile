import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useSegments, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';
import '../global.css';

import { supabase } from '../src/shared/infrastructure/supabase/client';
import { useAuthStore } from '../src/features/auth/presentation/store/authStore';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 5, // 5 min
        },
    },
});

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3B6FD4',
        background: '#FFFFFF',
        card: '#FFFFFF',
        text: '#1E2A3A',
        border: '#CBD2DC',
        notification: '#D94F4F',
    },
};

export default function RootLayout() {
    const { user, isLoading, setUser, setLoading } = useAuthStore();

    const [fontsLoaded] = useFonts({
        'GoogleSansFlex-Regular': require('../assets/fonts/GoogleSansFlex-Regular.ttf'),
        'GoogleSansFlex-Bold': require('../assets/fonts/GoogleSansFlex-Bold.ttf'),
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
        'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
        'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf'),
    });

    useEffect(() => {
        // Verificar sesión inicial
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                const u = session.user;
                setUser({
                    id: u.id,
                    email: u.email ?? '',
                    name: u.user_metadata?.name ?? 'Usuario',
                    avatarUrl: u.user_metadata?.avatar_url,
                });
            }
            setLoading(false);
        });

        // Escuchar cambios de auth en tiempo real
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                const u = session.user;
                setUser({
                    id: u.id,
                    email: u.email ?? '',
                    name: u.user_metadata?.name ?? 'Usuario',
                    avatarUrl: u.user_metadata?.avatar_url,
                });
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Auth Guard: Redirección automática según el estado
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading || !fontsLoaded) return;

        const inAuthGroup = segments[0] === 'auth';

        if (!user && !inAuthGroup) {
            // No logueado + intenta acceder a main o index -> redirigir a login
            router.replace('/auth/login');
        } else if (user && inAuthGroup) {
            // Logueado + intenta acceder a login/register -> redirigir a main
            router.replace('/main');
        }
    }, [user, isLoading, segments, fontsLoaded]);

    if (!fontsLoaded) {
        return <View style={{ flex: 1, backgroundColor: '#FFFFFF' }} />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider value={AppTheme}>
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="index" />
                            <Stack.Screen name="auth" />
                            <Stack.Screen name="main" />
                        </Stack>
                        <StatusBar style="dark" backgroundColor="#FFFFFF" />
                        <Toaster
                            position="top-center"
                            toastOptions={{
                                style: {
                                    backgroundColor: '#FFFFFF',
                                    borderColor: '#CBD2DC',
                                    borderWidth: 1,
                                },
                                titleStyle: {
                                    fontFamily: 'GoogleSansFlex-Bold',
                                    color: '#1E2A3A',
                                },
                            }}
                        />
                    </ThemeProvider>
                </QueryClientProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
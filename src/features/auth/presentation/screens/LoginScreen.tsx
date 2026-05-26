import { View, Text, Pressable, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { useRef } from 'react';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useForm } from '@tanstack/react-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

import { Input } from '../../../../shared/presentation/components/ui/Input';
import { Button } from '../../../../shared/presentation/components/ui/Button';
import { Divider } from '../../../../shared/presentation/components/ui/Divider';
import { getErrorMessage } from '../../../../shared/presentation/utils/form';
import { AuthHeader } from '../components/AuthHeader';
import { useAuth } from '../hooks/useAuth';
import { loginSchema } from '../../domain/schemas/auth.schema';

export function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
    
    const passwordRef = useRef<TextInput>(null);

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validators: {
            onSubmit: loginSchema,
        },
        onSubmit: async ({ value }) => {
            login.mutate(value);
        },
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 28,
                        paddingTop: 48,
                        paddingBottom: 32,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* ─── Header ─── */}
                    <AuthHeader
                        title="Bienvenido"
                        subtitle="Inicia sesión para continuar"
                        icon="person-circle-outline"
                    />

                    {/* ─── Email ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 100 }}
                    >
                        <form.Field
                            name="email"
                            validators={{
                                onBlur: loginSchema.shape.email,
                            }}
                        >
                            {(field) => (
                                <Input
                                    label="Correo electrónico"
                                    icon="mail-outline"
                                    placeholder="tu@email.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    value={field.state.value}
                                    onChangeText={field.handleChange}
                                    onBlur={() => field.handleBlur()}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                    blurOnSubmit={false}
                                    error={
                                        field.state.meta.isTouched && field.state.meta.errors.length > 0
                                            ? getErrorMessage(field.state.meta.errors)
                                            : undefined
                                    }
                                />
                            )}
                        </form.Field>
                    </MotiView>

                    {/* ─── Password ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 200 }}
                    >
                        <form.Field
                            name="password"
                            validators={{
                                onBlur: loginSchema.shape.password,
                            }}
                        >
                            {(field) => (
                                <Input
                                    ref={passwordRef}
                                    label="Contraseña"
                                    icon="lock-closed-outline"
                                    placeholder="••••••••"
                                    isPassword
                                    autoComplete="password"
                                    value={field.state.value}
                                    onChangeText={field.handleChange}
                                    onBlur={() => field.handleBlur()}
                                    returnKeyType="done"
                                    onSubmitEditing={() => form.handleSubmit()}
                                    error={
                                        field.state.meta.isTouched && field.state.meta.errors.length > 0
                                            ? getErrorMessage(field.state.meta.errors)
                                            : undefined
                                    }
                                />
                            )}
                        </form.Field>
                    </MotiView>

                    {/* ─── ¿Olvidaste tu contraseña? ─── */}
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'timing', duration: 500, delay: 250 }}
                        style={{ alignItems: 'flex-end', marginBottom: 28 }}
                    >
                        <Pressable
                            onPress={() => router.push('/auth/forgot-password')}
                            hitSlop={8}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Lato-Bold',
                                    fontSize: 13,
                                    color: '#3B6FD4',
                                }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Text>
                        </Pressable>
                    </MotiView>

                    {/* ─── Botón Login ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 300 }}
                    >
                        <Button
                            title="Iniciar sesión"
                            onPress={() => form.handleSubmit()}
                            loading={login.isPending}
                        />
                    </MotiView>

                    {/* ─── Divider ─── */}
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'timing', duration: 500, delay: 350 }}
                    >
                        <Divider text="o continúa con" />
                    </MotiView>

                    {/* ─── Google Button ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 400 }}
                    >
                        <Button
                            title="Continuar con Google"
                            variant="outline"
                            icon={
                                <Ionicons name="logo-google" size={20} color="#1E2A3A" />
                            }
                            onPress={() => {
                                // TODO: Implementar Google Sign-In
                                toast.info('Google Sign-In — próximamente');
                            }}
                        />
                    </MotiView>

                    {/* ─── Link a Registro ─── */}
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'timing', duration: 500, delay: 450 }}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 28,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Lato-Regular',
                                fontSize: 14,
                                color: '#8A8E94',
                            }}
                        >
                            ¿No tienes cuenta?{' '}
                        </Text>
                        <Pressable
                            onPress={() => router.push('/auth/register')}
                            hitSlop={8}
                        >
                            <Text
                                style={{
                                    fontFamily: 'Lato-Bold',
                                    fontSize: 14,
                                    color: '#3B6FD4',
                                }}
                            >
                                Regístrate
                            </Text>
                        </Pressable>
                    </MotiView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

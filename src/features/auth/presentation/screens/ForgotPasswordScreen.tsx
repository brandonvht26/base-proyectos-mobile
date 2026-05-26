import { Text, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useForm } from '@tanstack/react-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Input } from '../../../../shared/presentation/components/ui/Input';
import { Button } from '../../../../shared/presentation/components/ui/Button';
import { getErrorMessage } from '../../../../shared/presentation/utils/form';
import { AuthHeader } from '../components/AuthHeader';
import { useAuth } from '../hooks/useAuth';
import { forgotPasswordSchema } from '../../domain/schemas/auth.schema';

export function ForgotPasswordScreen() {
    const router = useRouter();
    const { forgotPassword } = useAuth();

    const form = useForm({
        defaultValues: {
            email: '',
        },
        validators: {
            onSubmit: forgotPasswordSchema,
        },
        onSubmit: async ({ value }) => {
            forgotPassword.mutate(value);
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
                        paddingTop: 16,
                        paddingBottom: 32,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* ─── Botón Volver ─── */}
                    <MotiView
                        from={{ opacity: 0, translateX: -10 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ type: 'timing', duration: 400 }}
                    >
                        <Pressable
                            onPress={() => router.back()}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 16,
                            }}
                            hitSlop={8}
                        >
                            <Ionicons name="chevron-back" size={24} color="#1E2A3A" />
                            <Text
                                style={{
                                    fontFamily: 'GoogleSansFlex-Bold',
                                    fontSize: 15,
                                    color: '#1E2A3A',
                                    marginLeft: 4,
                                }}
                            >
                                Volver
                            </Text>
                        </Pressable>
                    </MotiView>

                    {/* ─── Header ─── */}
                    <AuthHeader
                        title="Recuperar contraseña"
                        subtitle="Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña"
                        icon="key-outline"
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
                                onBlur: forgotPasswordSchema.shape.email,
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
                                    error={
                                        field.state.meta.isTouched && field.state.meta.errors.length > 0
                                            ? getErrorMessage(field.state.meta.errors)
                                            : undefined
                                    }
                                />
                            )}
                        </form.Field>
                    </MotiView>

                    {/* ─── Botón Enviar ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 200 }}
                        style={{ marginTop: 12 }}
                    >
                        <Button
                            title="Enviar enlace de recuperación"
                            onPress={() => form.handleSubmit()}
                            loading={forgotPassword.isPending}
                        />
                    </MotiView>

                    {/* ─── Link de vuelta a Login ─── */}
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'timing', duration: 500, delay: 300 }}
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
                            ¿Recordaste tu contraseña?{' '}
                        </Text>
                        <Pressable onPress={() => router.back()} hitSlop={8}>
                            <Text
                                style={{
                                    fontFamily: 'Lato-Bold',
                                    fontSize: 14,
                                    color: '#3B6FD4',
                                }}
                            >
                                Inicia sesión
                            </Text>
                        </Pressable>
                    </MotiView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
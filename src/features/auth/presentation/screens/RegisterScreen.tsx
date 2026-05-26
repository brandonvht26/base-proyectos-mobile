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
import { registerSchema, fieldSchemas } from '../../domain/schemas/auth.schema';

export function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuth();

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validators: {
            onSubmit: registerSchema,
        },
        onSubmit: async ({ value }) => {
            register.mutate({
                name: value.name,
                email: value.email,
                password: value.password,
            });
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
                        title="Crear cuenta"
                        subtitle="Completa tus datos para registrarte"
                        icon="person-add-outline"
                    />

                    {/* ─── Nombre ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 100 }}
                    >
                        <form.Field
                            name="name"
                            validators={{ onBlur: fieldSchemas.name }}
                        >
                            {(field) => (
                                <Input
                                    label="Nombre completo"
                                    icon="person-outline"
                                    placeholder="Tu nombre"
                                    autoCapitalize="words"
                                    autoComplete="name"
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

                    {/* ─── Email ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 200 }}
                    >
                        <form.Field
                            name="email"
                            validators={{ onBlur: fieldSchemas.email }}
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

                    {/* ─── Contraseña ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 300 }}
                    >
                        <form.Field
                            name="password"
                            validators={{ onBlur: fieldSchemas.strongPassword }}
                        >
                            {(field) => (
                                <Input
                                    label="Contraseña"
                                    icon="lock-closed-outline"
                                    placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número"
                                    isPassword
                                    autoComplete="new-password"
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

                    {/* ─── Confirmar Contraseña ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 400 }}
                    >
                        <form.Field
                            name="confirmPassword"
                            validators={{ onBlur: fieldSchemas.confirmPassword }}
                        >
                            {(field) => (
                                <Input
                                    label="Confirmar contraseña"
                                    icon="lock-closed-outline"
                                    placeholder="Repite tu contraseña"
                                    isPassword
                                    autoComplete="new-password"
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

                    {/* ─── Botón Registrar ─── */}
                    <MotiView
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'timing', duration: 500, delay: 500 }}
                        style={{ marginTop: 12 }}
                    >
                        <Button
                            title="Crear cuenta"
                            onPress={() => form.handleSubmit()}
                            loading={register.isPending}
                        />
                    </MotiView>

                    {/* ─── Link a Login ─── */}
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'timing', duration: 500, delay: 550 }}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 24,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'Lato-Regular',
                                fontSize: 14,
                                color: '#8A8E94',
                            }}
                        >
                            ¿Ya tienes cuenta?{' '}
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

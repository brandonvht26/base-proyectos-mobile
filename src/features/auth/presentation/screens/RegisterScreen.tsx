import { View, Text, Pressable, TextInput } from 'react-native';
import { useRef } from 'react';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useForm } from '@tanstack/react-form';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input } from '../../../../shared/presentation/components/ui/Input';
import { Button } from '../../../../shared/presentation/components/ui/Button';
import { KeyboardAwareScrollView } from '../../../../shared/presentation/components/ui/KeyboardAwareScrollView';
import { getErrorMessage } from '../../../../shared/presentation/utils/form';
import { colors } from '../../../../shared/presentation/theme/colors';
import { AuthHeader } from '../components/AuthHeader';
import { useAuth } from '../hooks/useAuth';
import { registerSchema, fieldSchemas } from '../../domain/schemas/auth.schema';

export function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuth();

    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.accent }}>
            <AuthHeader
                title="Crear cuenta"
                subtitle="Completa tus datos para registrarte"
                icon="person-add-outline"
                showBack
            />

            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    marginTop: -20,
                    paddingTop: 36,
                    paddingHorizontal: 28,
                    overflow: 'visible',
                }}
            >
                <KeyboardAwareScrollView
                    contentContainerStyle={{ paddingBottom: 32 }}
                    extraScrollPadding={40}
                >
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
                                    returnKeyType="next"
                                    onSubmitEditing={() => emailRef.current?.focus()}
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
                                    ref={emailRef}
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
                                    ref={passwordRef}
                                    label="Contraseña"
                                    icon="lock-closed-outline"
                                    placeholder="Mínimo 8 caracteres, 1 mayúscula, 1 número"
                                    isPassword
                                    autoComplete="new-password"
                                    value={field.state.value}
                                    onChangeText={field.handleChange}
                                    onBlur={() => field.handleBlur()}
                                    returnKeyType="next"
                                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
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
                                    ref={confirmPasswordRef}
                                    label="Confirmar contraseña"
                                    icon="lock-closed-outline"
                                    placeholder="Repite tu contraseña"
                                    isPassword
                                    autoComplete="new-password"
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
                                color: colors.muted,
                            }}
                        >
                            ¿Ya tienes cuenta?{' '}
                        </Text>
                        <Pressable onPress={() => router.back()} hitSlop={8}>
                            <Text
                                style={{
                                    fontFamily: 'Lato-Bold',
                                    fontSize: 14,
                                    color: colors.accent,
                                }}
                            >
                                Inicia sesión
                            </Text>
                        </Pressable>
                    </MotiView>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
}

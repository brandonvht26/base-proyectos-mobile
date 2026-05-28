import { View, Text, Pressable } from 'react-native';
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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.accent }}>
            <AuthHeader
                title="Recuperar contraseña"
                subtitle="Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña"
                icon="key-outline"
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
                        transition={{ type: 'timing', duration: 500, delay: 200 }}
                        style={{ marginTop: 12 }}
                    >
                        <Button
                            title="Enviar enlace de recuperación"
                            onPress={() => form.handleSubmit()}
                            loading={forgotPassword.isPending}
                        />
                    </MotiView>

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
                                color: colors.muted,
                            }}
                        >
                            ¿Recordaste tu contraseña?{' '}
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

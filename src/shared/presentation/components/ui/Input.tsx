import { useState, useCallback, forwardRef } from 'react';
import {
    View,
    TextInput,
    Text,
    Pressable,
    type TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

import { colors } from '../../theme/colors';

interface InputProps extends Omit<TextInputProps, 'onBlur'> {
    label: string;
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
    onBlur?: () => void;
}

export const Input = forwardRef<TextInput, InputProps>(({
    label,
    error,
    icon,
    isPassword,
    onBlur,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
        onBlur?.();
    }, [onBlur]);

    const isError = Boolean(error);
    const borderColor = isError ? colors.danger : isFocused ? colors.accent : colors.border;
    const backgroundColor = isFocused || isError ? colors.surface : colors.bgUnfocused;
    const iconColor = isError ? colors.danger : isFocused ? colors.accent : colors.muted;

    return (
        <View style={{ marginBottom: 20, overflow: 'visible' }}>
            <Text
                style={{
                    fontFamily: 'GoogleSansFlex-Bold',
                    fontSize: 13,
                    color: isError ? colors.danger : colors.label,
                    marginBottom: 8,
                    marginLeft: 4,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                }}
            >
                {label}
            </Text>

            <MotiView
                animate={{
                    borderColor,
                    borderWidth: isFocused || isError ? 1.5 : 1,
                    shadowOpacity: isFocused && !isError ? 0.1 : 0,
                }}
                transition={{ type: 'timing', duration: 200 }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor,
                    borderRadius: 16,
                    borderWidth: isFocused || isError ? 1.5 : 1,
                    paddingHorizontal: 16,
                    height: 56,
                    shadowColor: isFocused && !isError ? colors.accent : 'transparent',
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                    elevation: isFocused && !isError ? 2 : 0,
                }}
            >
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={iconColor}
                        style={{ marginRight: 12 }}
                    />
                )}

                <TextInput
                    ref={ref}
                    style={{
                        flex: 1,
                        fontFamily: 'Lato-Regular',
                        fontSize: 15,
                        color: colors.textPrimary,
                        paddingVertical: 0,
                    }}
                    placeholderTextColor={colors.mutedLight}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoCorrect={false}
                    {...props}
                />

                {isPassword && (
                    <Pressable
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        hitSlop={8}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={colors.muted}
                        />
                    </Pressable>
                )}
            </MotiView>

            {error && (
                <MotiView
                    from={{ opacity: 0, translateY: -4 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 200 }}
                >
                    <Text
                        style={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 13,
                            color: colors.danger,
                            marginTop: 6,
                            marginLeft: 4,
                        }}
                    >
                        {error}
                    </Text>
                </MotiView>
            )}
        </View>
    );
});

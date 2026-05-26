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

interface InputProps extends Omit<TextInputProps, 'onBlur'> {
    label: string;
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
    onBlur?: () => void;
}

const COLORS = {
    bgUnfocused: '#F8FAFC',
    bgFocused: '#FFFFFF',
    borderUnfocused: '#E2E8F0',
    borderFocused: '#2563EB',
    error: '#EF4444',
    text: '#0F172A',
    placeholder: '#94A3B8',
    label: '#475569',
    iconUnfocused: '#64748B',
};

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
    const borderColor = isError ? COLORS.error : isFocused ? COLORS.borderFocused : COLORS.borderUnfocused;
    const backgroundColor = isFocused || isError ? COLORS.bgFocused : COLORS.bgUnfocused;
    const iconColor = isError ? COLORS.error : isFocused ? COLORS.borderFocused : COLORS.iconUnfocused;

    return (
        <View style={{ marginBottom: 20 }}>
            {/* Label */}
            <Text
                style={{
                    fontFamily: 'GoogleSansFlex-Bold',
                    fontSize: 13,
                    color: isError ? COLORS.error : COLORS.label,
                    marginBottom: 8,
                    marginLeft: 4,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                }}
            >
                {label}
            </Text>

            {/* Input container */}
            <MotiView
                animate={{
                    borderColor,
                    shadowOpacity: isFocused ? 0.1 : 0,
                    scale: isFocused ? 1.02 : 1,
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
                    shadowColor: isFocused && !isError ? COLORS.borderFocused : '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                    elevation: isFocused ? 2 : 0,
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
                        color: COLORS.text,
                        paddingVertical: 0,
                    }}
                    placeholderTextColor={COLORS.placeholder}
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
                            color={COLORS.iconUnfocused}
                        />
                    </Pressable>
                )}
            </MotiView>

            {/* Error message */}
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
                            color: COLORS.error,
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

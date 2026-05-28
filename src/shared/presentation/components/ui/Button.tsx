import { type ReactNode } from 'react';
import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
    type PressableProps,
    type ViewStyle,
    type TextStyle,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { colors } from '../../theme/colors';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
    title: string;
    variant?: ButtonVariant;
    loading?: boolean;
    icon?: ReactNode;
}

const baseContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 24,
};

const variantStyles: Record<ButtonVariant, { normal: ViewStyle; disabled: ViewStyle }> = {
    primary: {
        normal: {
            backgroundColor: colors.accent,
            shadowColor: colors.accent,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4,
        },
        disabled: { backgroundColor: colors.accentLight, shadowOpacity: 0, elevation: 0 },
    },
    outline: {
        normal: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border },
        disabled: { backgroundColor: colors.bgDisabled, borderWidth: 1.5, borderColor: colors.borderLight, opacity: 0.7 },
    },
    ghost: {
        normal: { backgroundColor: 'transparent' },
        disabled: { backgroundColor: 'transparent', opacity: 0.5 },
    },
};

const textStyles: Record<ButtonVariant, TextStyle> = {
    primary: {
        color: colors.textInverse,
        fontFamily: 'GoogleSansFlex-Bold',
        fontSize: 16,
        letterSpacing: 0.3,
    },
    outline: {
        color: colors.textPrimary,
        fontFamily: 'GoogleSansFlex-Bold',
        fontSize: 16,
        letterSpacing: 0.3,
    },
    ghost: {
        color: colors.accent,
        fontFamily: 'GoogleSansFlex-Bold',
        fontSize: 15,
        letterSpacing: 0.3,
    },
};

export function Button({
    title,
    variant = 'primary',
    loading = false,
    disabled = false,
    icon,
    onPress,
    ...props
}: ButtonProps) {
    const isDisabled = disabled || loading;
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = (e: any) => {
        if (!isDisabled) {
            scale.value = withSpring(0.94, { damping: 15, stiffness: 300 });
        }
        props.onPressIn?.(e);
    };

    const handlePressOut = (e: any) => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        props.onPressOut?.(e);
    };

    const handlePress = (e: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
    };

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isDisabled}
            style={({ pressed }) => ({
                ...(pressed && !isDisabled ? { opacity: 0.9 } : {}),
            })}
            {...props}
        >
            <Animated.View
                style={[
                    baseContainerStyle,
                    isDisabled ? variantStyles[variant].disabled : variantStyles[variant].normal,
                    animatedStyle,
                ]}
            >
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={variant === 'primary' ? colors.textInverse : colors.accent}
                    />
                ) : (
                    <>
                        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
                        <Text style={textStyles[variant]}>{title}</Text>
                    </>
                )}
            </Animated.View>
        </Pressable>
    );
}

import {
    ScrollView,
    View,
    type ScrollViewProps,
    type ViewStyle,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    type FlexStyle,
} from 'react-native';
import { type ReactNode, useEffect, useRef, useState } from 'react';

interface KeyboardAwareScrollViewProps extends Omit<ScrollViewProps, 'children'> {
    children: ReactNode;
    contentContainerStyle?: ViewStyle | FlexStyle;
    extraScrollPadding?: number;
    keyboardVerticalOffset?: number;
}

export function KeyboardAwareScrollView({
    children,
    contentContainerStyle,
    extraScrollPadding = 40,
    keyboardVerticalOffset = 0,
    ...scrollViewProps
}: KeyboardAwareScrollViewProps) {
    const scrollRef = useRef<ScrollView>(null);
    const [keyboardPadding, setKeyboardPadding] = useState(0);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSub = Keyboard.addListener(showEvent, (e) => {
            const keyboardHeight = e.endCoordinates.height;
            setKeyboardPadding(keyboardHeight + extraScrollPadding);
            setTimeout(() => {
                scrollRef.current?.scrollToEnd({ animated: true });
            }, 100);
        });

        const hideSub = Keyboard.addListener(hideEvent, () => {
            setKeyboardPadding(extraScrollPadding);
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, [extraScrollPadding]);

    const mergedContentStyle = [
        { flexGrow: 1, paddingBottom: keyboardPadding || extraScrollPadding },
        contentContainerStyle,
    ];

    if (Platform.OS === 'ios') {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <ScrollView
                    ref={scrollRef}
                    contentContainerStyle={mergedContentStyle}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    {...scrollViewProps}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={mergedContentStyle}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                {...scrollViewProps}
            >
                {children}
            </ScrollView>
        </View>
    );
}

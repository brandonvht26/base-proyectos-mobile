import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useAuthStore } from '../src/features/auth/presentation/store/authStore';

export default function Index() {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                }}
            >
                <ActivityIndicator size="large" color="#3B6FD4" />
            </View>
        );
    }

    if (user) {
        return <Redirect href="/main" />;
    }

    return <Redirect href="/auth/login" />;
}

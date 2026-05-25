import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary:    '#3B6FD4',
    background: '#F7F8FA',
    card:       '#FFFFFF',
    text:       '#1E2A3A',
    border:     '#CBD2DC',
    notification: '#D94F4F',
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'GoogleSansFlex-Regular': require('../assets/fonts/GoogleSansFlex-Regular.ttf'),
    'GoogleSansFlex-Bold':    require('../assets/fonts/GoogleSansFlex-Bold.ttf'),
    'Lato-Regular':           require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold':              require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Italic':            require('../assets/fonts/Lato-Italic.ttf'),
  });

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: '#F7F8FA' }} />;

  return (
    <ThemeProvider value={AppTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="dark" backgroundColor="#F7F8FA" />
    </ThemeProvider>
  );
}
// app/_layout.tsx
import React from 'react';
import { ActivityIndicator, View, Text, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Fonts
import { useFonts } from 'expo-font';
import {
  Inter_400Regular as UI_Regular,
  Inter_700Bold as UI_Bold,
} from '@expo-google-fonts/inter';
import {
  NotoSerifHebrew_400Regular as Heb_Regular,
  NotoSerifHebrew_700Bold as Heb_Bold,
} from '@expo-google-fonts/noto-serif-hebrew';

// Theme
import { C } from '../src/styles/theme';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    'UI-Regular': UI_Regular,
    'UI-Bold': UI_Bold,
    'Hebrew-Regular': Heb_Regular,
    'Hebrew-Bold': Heb_Bold,
  });

  if (!fontsLoaded && !fontsError) {
    return (
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: C.bg }}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <View style={{ flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator />
              <Text style={{ color: C.text, marginTop: 8 }}>Loading fonts…</Text>
            </View>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  if (fontsError) {
    console.warn('Font load error:', fontsError);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: C.bg }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: C.bg },
                animation: 'slide_from_right',
              }}
            />
            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

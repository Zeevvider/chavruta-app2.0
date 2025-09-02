import { Stack } from 'expo-router';
// Make sure the path is correct and the file exists
import { AuthProvider } from '../(auth)/AuthProvider';
// If the file does not exist, create it at ../config/auth/AuthProvider.tsx or update the import path accordingly

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}

// app/(auth)/login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, getRedirectTo } from 'others/config/lib/supabase';

const isEmail = (v: string) => /.+@.+\..+/.test(v);

// Change this if your real home route is different
const HOME_ROUTE = '/Home/HomeScreen/';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = isEmail(email) && password.length > 0 && !loading;

  const onSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace(HOME_ROUTE);
    } catch (e: any) {
      Alert.alert('Sign in failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      setLoading(true);
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: getRedirectTo() },
      });
      // Callback screen will handle session and routing afterward
    } catch (e: any) {
      Alert.alert('Google sign-in failed', e.message);
      setLoading(false);
    }
  };

  const onSkipNow = async () => {
    // mark that we intentionally skipped (useful if index.tsx checks this)
    await AsyncStorage.setItem('devSkip', 'true');
    // optional: mark onboarding as done
    await AsyncStorage.setItem('onboardingDone', 'true');
    // go straight to your app's home screen route (bypasses / redirect)
    router.replace(HOME_ROUTE);
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Welcome</Text>

      <TextInput
        style={s.input}
        placeholder="Email address"
        placeholderTextColor="#9BA3AF"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={s.input}
        placeholder="Password"
        placeholderTextColor="#9BA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        style={[s.primaryBtn, !canSubmit && s.disabled]}
        onPress={onSignIn}
        disabled={!canSubmit}
      >
        <Text style={s.primaryText}>{loading ? 'Please wait…' : 'Continue'}</Text>
      </Pressable>

      <View style={s.sepWrap}>
        <View style={s.sepLine} />
        <Text style={s.sepText}>or</Text>
        <View style={s.sepLine} />
      </View>

      <Pressable style={[s.googleBtn, loading && s.disabled]} onPress={onGoogle} disabled={loading}>
        <Text style={s.googleText}>G  Continue with Google</Text>
      </Pressable>

      <Text style={s.footer}>
        Don’t have an account? <Link href="/(auth)/signup">Sign up</Link>
      </Text>

      {/* Developer skip button */}
      <Pressable style={s.skipBtn} onPress={onSkipNow}>
        <Text style={s.skipText}>Skip for now</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EBDD', // cream
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E1E1E',
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'left',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  primaryBtn: {
    backgroundColor: '#ADC2A5', // green CTA
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  disabled: { opacity: 0.6 },
  sepWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  },
  sepLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  sepText: { color: '#9BA3AF' },
  googleBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  googleText: { color: '#1F2937', fontWeight: '700' },
  footer: { textAlign: 'center', marginTop: 16, color: '#6B7280' },
  skipBtn: { marginTop: 20, alignSelf: 'center', padding: 8 },
  skipText: { color: '#9BA3AF', textDecorationLine: 'underline' },
});

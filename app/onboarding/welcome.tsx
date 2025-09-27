// app/onboarding/welcome.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('others/config/assets/images/icon.png')} // replace with your asset path
        style={styles.hero}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Chavruta</Text>
      <Text style={styles.subtitle}>
        Learn Torah one step at a time, with a partner or solo.
      </Text>

      <View style={styles.buttonWrap}>
        <Text style={styles.buttonText} onPress={() => router.push('/(auth)/login')}>
          Get Started
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EBDD', // cream background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  hero: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonWrap: {
    backgroundColor: '#ADC2A5', // green CTA
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

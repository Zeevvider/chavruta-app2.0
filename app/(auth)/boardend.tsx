// app/onboarding/boardend.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const COLORS = {
  cream: '#F7EBDD',
  text: '#1E1E1E',
  green: '#ADC2A5',
  white: '#FFFFFF',
  muted: '#6B7280',
};

export default function BoardEnd() {
  const router = useRouter();

  const goHome = () => {
    // go directly to the Home screen
    router.replace('/Home/HomeScreen');
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>You're All Set!</Text>
      <Text style={s.subtitle}>
        Welcome to Chavruta. Start learning, connecting, and growing in Torah.
      </Text>

      <Pressable style={s.primaryBtn} onPress={goHome}>
        <Text style={s.primaryText}>Enter the App</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryBtn: {
    backgroundColor: COLORS.green,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
});

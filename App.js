import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Button from './others/config/components/Button';
import { colors, spacing, type } from './src/styles/tokens';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Chavruta App — Fresh Start</Text>
        <Text style={styles.sub}>Tap the button to prove everything works.</Text>
        <Button title={`Tapped ${count} times`} onPress={() => setCount((n) => n + 1)} />
        <Button title="Ghost Button" variant="ghost" onPress={() => {}} style={{ marginTop: spacing[3] }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: spacing[4] },
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: spacing[4], gap: spacing[3] },
  title: { ...type.h2, color: colors.text },
  sub: { ...type.caption, color: colors.subtext },
});

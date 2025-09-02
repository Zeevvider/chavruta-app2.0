import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { C } from '../../../src/styles/theme';

export default function VideoTile({
  participant,
  style,
  small,
}: { participant: 'self' | 'partner'; style?: ViewStyle; small?: boolean }) {
  return (
    <View style={[styles.tile, style, small && { borderRadius: 16 }]}>
      <Text style={styles.label}>{participant}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: C.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: C.sub, fontWeight: '600' },
});

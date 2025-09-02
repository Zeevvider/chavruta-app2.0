import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '@ui/chavruta/IconButton';
import { C } from 'src/styles/theme';
import { spacing, typography } from 'src/styles/theme';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.appTitle}>Stender</Text>
      <View style={styles.headerActions}>
        <IconButton icon="notifications-outline" onPress={() => {}} />
        <IconButton icon="help-circle-outline" onPress={() => {}} />
        <IconButton icon="settings-outline" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: (spacing?.md ?? 12),
  },
  appTitle: {
    color: C.text,
    fontSize: (typography?.sizes?.xl ?? 22),
    fontWeight: '700',
  },
  headerActions: { flexDirection: 'row', gap: 8 },
});

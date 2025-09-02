import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

const C = {
  card:  colors.surface,
  text:  colors.textPrimary,     // <- map to the name you need
  sub:   colors.textSecondary,   // <- if you use subtitle color
  border: colors.border,
};

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ gap: spacing.md }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.lg,
    paddingTop: spacing.sm,
  },
  title: {
    color: C.text,               // now valid
    fontWeight: '700',
    fontSize: 16,
    marginBottom: spacing.sm,
  },
});

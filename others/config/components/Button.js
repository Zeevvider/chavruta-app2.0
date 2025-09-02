import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, spacing, radius, type } from '../../../src/styles/tokens';

export default function Button({ title, onPress, loading, variant = 'primary', style, disabled }) {
  const isGhost = variant === 'ghost';
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        isGhost ? styles.ghost : styles.primary,
        (disabled || loading) && { opacity: 0.6 },
        style,
      ]}
    >
      {loading ? <ActivityIndicator /> : (
        <Text style={[styles.text, isGhost && { color: colors.primary }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
  text: { ...type.body, color: colors.bg, fontWeight: '700' },
});

// src/components/library/FilterChip.tsx
import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../styles/design-system';

export interface FilterChipProps {
  label: string;
  isActive?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export default function FilterChip({
  label,
  isActive = false,
  onPress,
  style,
  testID,
  accessibilityLabel,
}: FilterChipProps) {
  const chipStyles = [
    styles.chip,
    isActive && styles.chipActive,
    style,
  ];

  const textStyles = [
    styles.chipText,
    isActive && styles.chipTextActive,
  ];

  const plusStyles = [
    styles.plus,
    isActive && styles.plusActive,
  ];

  return (
    <Pressable
      onPress={onPress}
      style={chipStyles}
      testID={testID}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
    >
      <Text style={textStyles}>{label}</Text>
      <Text style={plusStyles}>＋</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3.5],
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.neutral[700],
    marginRight: spacing[2],
    backgroundColor: colors.neutral[800],
  },
  chipActive: {
    backgroundColor: colors.neutral[0],
    borderColor: colors.neutral[0],
  },
  chipText: {
    color: colors.neutral[200],
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },
  chipTextActive: {
    color: colors.neutral[900],
  },
  plus: {
    marginLeft: spacing[2],
    color: colors.neutral[400],
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  plusActive: {
    color: colors.neutral[900],
  },
});

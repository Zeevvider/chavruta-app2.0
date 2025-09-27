// src/components/chavruta/ChavrutaButton.tsx
import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../styles/design-system';

export interface ChavrutaButtonProps {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export default function ChavrutaButton({
  label,
  onPress,
  icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  testID,
  accessibilityLabel,
}: ChavrutaButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    isDisabled && styles.disabledText,
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={buttonStyles}
      testID={testID}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      {icon && !loading && (
        <Ionicons
          name={icon}
          size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
          color={variant === 'primary' ? colors.text.inverse : colors.primary[500]}
          style={styles.icon}
        />
      )}
      <Text style={textStyles}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
  },
  
  // Variants
  primary: {
    backgroundColor: colors.primary[400],
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[400],
  },
  
  // Sizes
  sm: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    minHeight: 32,
  },
  md: {
    paddingHorizontal: spacing[3.5],
    paddingVertical: spacing[2.5],
    minHeight: 40,
  },
  lg: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    minHeight: 48,
  },
  
  // States
  disabled: {
    opacity: 0.6,
  },
  
  // Text styles
  text: {
    fontWeight: typography.weights.extrabold,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.primary[500],
  },
  
  smText: {
    fontSize: typography.sizes.sm,
  },
  mdText: {
    fontSize: typography.sizes.base,
  },
  lgText: {
    fontSize: typography.sizes.lg,
  },
  
  disabledText: {
    opacity: 0.6,
  },
  
  // Icon
  icon: {
    marginRight: spacing[2],
  },
});

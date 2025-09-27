// src/components/base/Text.tsx
import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { typography, colors } from '../../styles/design-system';

export type TextVariant = keyof typeof typography.styles;
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'muted' | 'success' | 'warning' | 'error';

export interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right' | 'justify';
  numberOfLines?: number;
  style?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityRole?: string;
}

export default function Text({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  numberOfLines,
  style,
  testID,
  accessibilityLabel,
  accessibilityRole = 'text',
}: TextProps) {
  const textStyles = [
    typography.styles[variant],
    styles[color],
    { textAlign: align },
    style,
  ];

  return (
    <RNText
      style={textStyles}
      numberOfLines={numberOfLines}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  primary: {
    color: colors.text.primary,
  },
  secondary: {
    color: colors.text.secondary,
  },
  tertiary: {
    color: colors.text.tertiary,
  },
  inverse: {
    color: colors.text.inverse,
  },
  muted: {
    color: colors.text.muted,
  },
  success: {
    color: colors.semantic.success,
  },
  warning: {
    color: colors.semantic.warning,
  },
  error: {
    color: colors.semantic.error,
  },
});

// src/components/chavruta/IconButton.tsx
import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../styles/design-system';

export interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: (e: GestureResponderEvent) => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export default function IconButton({
  icon,
  onPress,
  size = 20,
  color = colors.text.secondary,
  backgroundColor = 'transparent',
  disabled = false,
  style,
  testID,
  accessibilityLabel,
}: IconButtonProps) {
  const buttonStyles = [
    styles.button,
    {
      backgroundColor,
      width: size + spacing[3],
      height: size + spacing[3],
    },
    disabled && styles.disabled,
    style,
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={buttonStyles}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Ionicons
        name={icon}
        size={size}
        color={disabled ? colors.text.tertiary : color}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
  },
  disabled: {
    opacity: 0.5,
  },
});

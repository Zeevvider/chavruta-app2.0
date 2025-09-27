// src/components/base/Input.tsx
import React, { forwardRef } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Text,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../styles/design-system';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextInputProps['style'];
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<TextInput, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  variant = 'outlined',
  size = 'md',
  ...props
}, ref) => {
  const hasError = !!error;
  const hasHelperText = !!helperText || hasError;

  const containerStyles = [
    styles.container,
    containerStyle,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    styles[variant],
    styles[size],
    hasError && styles.error,
    props.editable === false && styles.disabled,
  ];

  const inputStyles = [
    styles.input,
    styles[`${size}Input`],
    inputStyle,
  ];

  return (
    <View style={containerStyles}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}
      
      <View style={inputContainerStyles}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          ref={ref}
          style={inputStyles}
          placeholderTextColor={colors.text.tertiary}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {hasHelperText && (
        <Text 
          variant="caption" 
          color={hasError ? 'error' : 'muted'}
          style={styles.helperText}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  
  label: {
    marginBottom: spacing[2],
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  
  // Variants
  default: {
    backgroundColor: colors.background.secondary,
    borderColor: colors.border.light,
  },
  filled: {
    backgroundColor: colors.background.tertiary,
    borderColor: 'transparent',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: colors.border.medium,
  },
  
  // Sizes
  sm: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    minHeight: 36,
  },
  md: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[4],
    minHeight: 52,
  },
  
  // States
  error: {
    borderColor: colors.semantic.error,
  },
  disabled: {
    backgroundColor: colors.neutral[100],
    opacity: 0.6,
  },
  
  // Input text
  input: {
    flex: 1,
    ...typography.styles.body,
    color: colors.text.primary,
  },
  smInput: {
    fontSize: typography.sizes.sm,
  },
  mdInput: {
    fontSize: typography.sizes.base,
  },
  lgInput: {
    fontSize: typography.sizes.lg,
  },
  
  // Icons
  leftIcon: {
    marginRight: spacing[2],
  },
  rightIcon: {
    marginLeft: spacing[2],
  },
  
  // Helper text
  helperText: {
    marginTop: spacing[1],
  },
});

export default Input;

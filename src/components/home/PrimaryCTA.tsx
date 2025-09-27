// src/components/home/PrimaryCTA.tsx
import React, { useMemo, useRef } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  I18nManager,
  GestureResponderEvent,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/design-system';

export interface PrimaryCTAProps {
  line1?: string;
  line2?: string;
  onPress: (e: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  colors?: [string, string]; // gradient colors
  small?: boolean;
  rightIconName?: keyof typeof Ionicons.glyphMap | null; // null to hide icon
  leftIconName?: keyof typeof Ionicons.glyphMap | null;
}

export default function PrimaryCTA({
  line1 = 'Continue Learning',
  line2 = 'Mishnah Berakhot 1:1',
  onPress,
  loading = false,
  disabled = false,
  testID = 'primary-cta',
  style,
  colors: gradientColors = ['#F8B400', '#F48C06'],
  small = false,
  rightIconName = 'chevron-forward',
  leftIconName = null,
}: PrimaryCTAProps) {
  const isDisabled = disabled || loading;

  // Simple debounce to avoid double taps
  const lastTap = useRef(0);
  const handlePress = (e: GestureResponderEvent) => {
    if (isDisabled) return;
    const now = Date.now();
    if (now - lastTap.current < 500) return;
    lastTap.current = now;
    onPress(e);
  };

  const chevron = useMemo(
    () => (I18nManager.isRTL ? 'chevron-back' : 'chevron-forward'),
    []
  );

  const containerStyles = [
    styles.container,
    small && styles.containerSmall,
    style,
  ];

  const gradientStyles = [
    styles.gradient,
    small && styles.gradientSmall,
  ];

  const textContainerStyles = [
    styles.textContainer,
    small && styles.textContainerSmall,
  ];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${line1}. ${line2}`}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPress={handlePress}
      disabled={isDisabled}
      testID={testID}
      android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: false }}
      style={({ pressed }) => [
        styles.outer,
        small && styles.outerSmall,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={isDisabled ? [colors.neutral[300], colors.neutral[400]] : gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={gradientStyles}
      >
        <View style={textContainerStyles}>
          {leftIconName && !loading && (
            <Ionicons
              name={leftIconName}
              size={small ? 20 : 24}
              color="#2a231b"
              style={styles.leftIcon}
            />
          )}
          
          <View style={styles.textBlock}>
            <Text
              style={[styles.line1, small && styles.line1Small]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {line1}
            </Text>
            {!!line2 && (
              <Text
                style={[styles.line2, small && styles.line2Small]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {line2}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.rightContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#2a231b" />
          ) : rightIconName === null ? null : (
            <Ionicons
              name={(rightIconName ?? chevron) as any}
              size={small ? 20 : 26}
              color="#2a231b"
            />
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing[4],
  },
  containerSmall: {
    marginHorizontal: spacing[3],
  },
  outer: {
    borderRadius: borderRadius['3xl'],
    ...shadows.lg,
  },
  outerSmall: {
    borderRadius: borderRadius['2xl'],
  },
  gradient: {
    borderRadius: borderRadius['3xl'],
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[5],
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradientSmall: {
    borderRadius: borderRadius['2xl'],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    minHeight: 64,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  disabled: {
    opacity: 0.6,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing[3],
  },
  textContainerSmall: {
    paddingRight: spacing[2],
  },
  textBlock: {
    flex: 1,
  },
  line1: {
    ...typography.styles.h4,
    fontWeight: typography.weights.extrabold,
    color: '#2a231b',
  },
  line1Small: {
    fontSize: typography.sizes.lg,
  },
  line2: {
    marginTop: spacing[1],
    ...typography.styles.bodyLarge,
    fontWeight: typography.weights.bold,
    color: '#2a231b',
  },
  line2Small: {
    fontSize: typography.sizes.base,
    marginTop: 2,
  },
  leftIcon: {
    marginRight: spacing[2],
  },
  rightContainer: {
    width: 36,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

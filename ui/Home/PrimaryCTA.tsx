import React, { useMemo, useRef } from 'react';
import {
  Pressable, Text, StyleSheet, View, ActivityIndicator,
  I18nManager, GestureResponderEvent, ViewStyle, StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export type PrimaryCTAProps = {
  line1?: string;
  line2?: string;
  onPress: (e: GestureResponderEvent) => void; // required: parent controls nav
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  colors?: [string, string];      // gradient
  small?: boolean;
  rightIconName?: keyof typeof Ionicons.glyphMap | null; // null to hide icon
};

export default function PrimaryCTA({
  line1 = 'Continue Learning',
  line2 = 'Mishnah Berakhot 1:1',
  onPress,
  loading = false,
  disabled = false,
  testID = 'primary-cta',
  style,
  colors = ['#F8B400', '#F48C06'],
  small = false,
  rightIconName = 'chevron-forward',
}: PrimaryCTAProps) {
  const isDisabled = disabled || loading;

  // simple debounce to avoid double taps
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
        style,
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, small && styles.gradientSmall]}
      >
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

        <View style={styles.right}>
          {loading ? (
            <ActivityIndicator size="small" color="#2a231b" />
          ) : rightIconName === null ? null : (
            <Ionicons name={(rightIconName ?? chevron) as any} size={26} color="#2a231b" />
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginHorizontal: 16,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 5,
  },
  outerSmall: { borderRadius: 22 },
  gradient: {
    borderRadius: 28,
    paddingVertical: 18,
    paddingHorizontal: 20,
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradientSmall: {
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 64,
  },
  pressed: { transform: [{ scale: 0.99 }], opacity: 0.96 },
  disabled: { opacity: 0.6 },
  textBlock: { flex: 1, paddingRight: 12 },
  line1: { fontSize: 22, fontWeight: '800', color: '#2a231b' },
  line1Small: { fontSize: 18 },
  line2: { marginTop: 4, fontSize: 18, fontWeight: '700', color: '#2a231b' },
  line2Small: { fontSize: 16, marginTop: 2 },
  right: { width: 36, alignItems: 'flex-end', justifyContent: 'center' },
});

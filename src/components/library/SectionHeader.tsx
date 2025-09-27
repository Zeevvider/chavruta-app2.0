// src/components/library/SectionHeader.tsx
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { colors, typography, spacing } from '../../styles/design-system';

export interface SectionHeaderProps {
  title: string;
  onSeeAllPress?: (e: GestureResponderEvent) => void;
  showSeeAll?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function SectionHeader({
  title,
  onSeeAllPress,
  showSeeAll = true,
  style,
  testID,
}: SectionHeaderProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={styles.title}>{title}</Text>
      {showSeeAll && (
        <Pressable
          onPress={onSeeAllPress}
          hitSlop={8}
          testID="see-all-button"
          accessibilityLabel={`See all ${title}`}
          accessibilityRole="button"
        >
          <Text style={styles.seeAll}>See all ›</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[3.5],
    marginBottom: spacing[2],
  },
  title: {
    color: colors.neutral[0],
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.extrabold,
  },
  seeAll: {
    color: colors.neutral[400],
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },
});

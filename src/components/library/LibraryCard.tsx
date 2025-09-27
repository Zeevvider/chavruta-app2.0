// src/components/library/LibraryCard.tsx
import React from 'react';
import {
  Pressable,
  Image,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../styles/design-system';

export interface LibraryCardProps {
  title: string;
  coverUri: string;
  studyingCount?: number;
  onPress?: (e: GestureResponderEvent) => void;
  width?: number;
  height?: number;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export default function LibraryCard({
  title,
  coverUri,
  studyingCount = 0,
  onPress,
  width = 130,
  height = 180,
  style,
  testID,
  accessibilityLabel,
}: LibraryCardProps) {
  const cardStyles = [
    styles.card,
    { width },
    style,
  ];

  const imageStyles = [
    styles.image,
    { width, height },
  ];

  return (
    <Pressable
      onPress={onPress}
      style={cardStyles}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
    >
      <Image
        source={{ uri: coverUri }}
        style={imageStyles}
        resizeMode="cover"
      />
      
      {studyingCount > 0 && (
        <View style={styles.badge}>
          <View style={styles.dot} />
          <Text style={styles.badgeText}>{studyingCount} studying</Text>
        </View>
      )}
      
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: spacing[2.5],
  },
  image: {
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral[700],
  },
  title: {
    color: colors.neutral[0],
    marginTop: spacing[1.5],
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.sm,
  },
  badge: {
    position: 'absolute',
    left: spacing[2],
    bottom: spacing[2],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(0,0,0,0.55)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.semantic.success,
    marginRight: spacing[1.5],
  },
  badgeText: {
    color: colors.neutral[0],
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
});

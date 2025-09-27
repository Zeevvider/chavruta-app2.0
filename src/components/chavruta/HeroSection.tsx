// src/components/chavruta/HeroSection.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../styles/design-system';
import ChavrutaButton from './ChavrutaButton';

export interface HeroSectionProps {
  userName: string;
  userLevel: string;
  onFindChavrutaPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function HeroSection({
  userName,
  userLevel,
  onFindChavrutaPress,
  style,
  testID,
}: HeroSectionProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>שלום, {userName}</Text>
        <Text style={styles.subtitle}>Ready to learn? Your level: {userLevel}</Text>
      </View>
      
      <ChavrutaButton
        label="Find chavruta"
        onPress={onFindChavrutaPress || (() => {})}
        icon="search"
        variant="primary"
        testID="find-chavruta-button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    color: colors.text.secondary,
    marginTop: spacing[1],
    fontSize: typography.sizes.base,
  },
});

// src/components/home/CharacterFigure.tsx
import React from 'react';
import { Image, StyleSheet, ImageSourcePropType, ViewStyle } from 'react-native';

export interface CharacterFigureProps {
  source: ImageSourcePropType;
  width?: number;
  aspectRatio?: number; // width / height of your art
  left?: number;
  right?: number;
  bottom?: number;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

export default function CharacterFigure({
  source,
  width = 330,
  aspectRatio = 0.58,
  left,
  right,
  bottom = -8,
  style,
  testID,
  accessibilityLabel = 'Character illustration',
}: CharacterFigureProps) {
  const height = width / aspectRatio;
  
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[
        styles.image,
        { width, height, left, right, bottom },
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityIgnoresInvertColors
    />
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    zIndex: 2,
  },
});

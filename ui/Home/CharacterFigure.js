import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function CharacterFigure({
  source,
  width = 330,
  aspectRatio = 0.58,   // width / height of your art
  left,
  right,
  bottom = -8,
  style,
}) {
  const height = width / aspectRatio;
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[styles.img, { width, height, left, right, bottom }, style]}
      accessibilityIgnoresInvertColors
    />
  );
}

const styles = StyleSheet.create({
  img: { position: 'absolute', zIndex: 2 },
});

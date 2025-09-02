// ui/HelpButton.tsx
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type Props = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
  backgroundColor?: string;
};

export default function HelpButton({
  onPress,
  style,
  size = 28,
  backgroundColor = '#FFE083',
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
      hitSlop={8}
    >
      <Text style={styles.label}>?</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontWeight: '800',
    color: '#2a231b',
  },
});

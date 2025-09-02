// app/chavruta/components/Tag.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Light theme palette
const C = {
  background: '#FFF9F2',   // warm cream background
  border: 'rgba(0,0,0,0.06)', 
  text: '#3A2D1F',         // dark brown
  sub: '#6B5E55',          // muted subtext
  accent: '#FBBF24',       // warm orange
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: C.accent,   // pill uses orange background
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 0,              // no heavy border
  },
  tagText: {
    color: '#fff',               // white text for contrast
    fontWeight: '700',
    fontSize: 12,
  },
});

export default function Tag({ text }: { text: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

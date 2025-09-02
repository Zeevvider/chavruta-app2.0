import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../src/styles/theme'; // adjust if your theme path differs

type Props = {
  label: string;
  onPress: () => void;
  icon?: any;
  type?: 'default' | 'primary';   // <-- add this
};

export default function SmallButton({ label, onPress, icon, type = 'default' }: Props) {
  const isPrimary = type === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        isPrimary
          ? { backgroundColor: C.accent }
          : { backgroundColor: C.card, borderColor: C.border, borderWidth: 1 },
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={14}
          color={isPrimary ? '#fff' : C.text}
          style={{ marginRight: 6 }}
        />
      )}
      <Text style={[styles.label, { color: isPrimary ? '#fff' : C.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  label: { fontWeight: '600', fontSize: 13 },
});

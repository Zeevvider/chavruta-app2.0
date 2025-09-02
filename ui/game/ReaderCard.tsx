// ui/ReaderCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HelpButton from './HelpButton';

type Props = {
  text: string;
  fontScale: number;
  onFontIncrease: () => void;
  onFontDecrease: () => void;
  onHelp?: () => void;
  onMarkChavruta: () => void;
};

export default function ReaderCard({
  text,
  fontScale,
  onFontIncrease,
  onFontDecrease,
  onHelp,
  onMarkChavruta,
}: Props) {
  return (
    <View style={s.card}>
      {onHelp && <HelpButton onPress={onHelp} style={s.help} />}

      <Text
        style={[
          s.hebrew,
          { fontSize: 22 * fontScale, lineHeight: 34 * fontScale },
        ]}
      >
        {text}
      </Text>

      <View style={s.controlsRow}>
        <Pressable onPress={onFontDecrease} style={s.ctrl}>
          <Ionicons name="remove" size={18} color="#2a231b" />
        </Pressable>
        <Pressable onPress={onFontIncrease} style={s.ctrl}>
          <Ionicons name="add" size={18} color="#2a231b" />
        </Pressable>

        <View style={{ flex: 1 }} />

        <Pressable
          onPress={onMarkChavruta}
          style={[s.badge, { backgroundColor: '#FFE083' }]}
        >
          <Text style={s.badgeTxt}>⭐ Chavruta</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EFE7DE',
    position: 'relative',
  },
  hebrew: {
    writingDirection: 'rtl',
    textAlign: 'right',
    color: '#2a231b',
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ctrl: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F3EFE8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  badge: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTxt: { fontWeight: '800', color: '#2a231b' },
  help: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

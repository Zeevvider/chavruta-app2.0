// app/chavruta/room/ControlsBar.tsx
import React from 'react';
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../../src/styles/theme';

type Props = {
  style?: StyleProp<ViewStyle>;
  micOn: boolean;
  camOn: boolean;
  onToggleMic: () => void;
  onToggleCam: () => void;
  onFlipCam: () => void;
  onOpenSources: () => void;
  onEndCall: () => void;
};

const Pill = ({
  icon,
  active,
  onPress,
  bg,
  color,
}: {
  icon: string;
  active?: boolean;
  onPress: () => void;
  bg?: string;
  color?: string;
}) => (
  <View
    style={[
      styles.pill,
      { backgroundColor: bg ?? C.card, borderColor: C.border },
      active ? styles.active : null,
    ]}
  >
    <Pressable onPress={onPress} style={styles.btn}>
      <Ionicons name={icon as any} size={22} color={color ?? C.text} />
    </Pressable>
  </View>
);

export default function ControlsBar({
  style,
  micOn,
  camOn,
  onToggleMic,
  onToggleCam,
  onFlipCam,
  onOpenSources,
  onEndCall,
}: Props) {
  return (
    <View style={[styles.row, style]}>
      <Pill
        icon={micOn ? 'mic' : 'mic-off'}
        active={micOn}
        bg={micOn ? C.accent : C.card}
        color={micOn ? '#fff' : C.text}
        onPress={onToggleMic}
      />

      <Pill
        icon={camOn ? 'videocam' : 'videocam-off'}
        onPress={onToggleCam}
      />

      <Pill icon="camera-reverse" onPress={onFlipCam} />

      <Pill icon="book" onPress={onOpenSources} />

      <Pill
        icon="call"
        bg="#FF5A5F"
        color="#fff"
        onPress={onEndCall}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    overflow: 'hidden',
  },
  btn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
});

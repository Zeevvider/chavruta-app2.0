// app/chavruta/components/LiveBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import PrimaryButton from '@ui/chavruta/PrimaryButton';
import { Session } from '@types';
import { C } from 'src/styles/theme'; // ✅ use normalized theme

// optional: if you add these to C later, these lines will auto-pick them up
const successBg     = (C as any).successBg     ?? '#132a1a';
const successBorder = (C as any).successBorder ?? '#1f7a47';
const successTitle  = (C as any).successTitle  ?? '#85e0a6';
const successText   = (C as any).successText   ?? '#c9f2d8';

const styles = StyleSheet.create({
  liveBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: successBg,
    borderColor: successBorder,
    borderWidth: 1,
    padding: 14,
    borderRadius: 14,
    marginTop: 16,
    gap: 12,
  },
  liveTitle: { color: successTitle, fontWeight: '800', letterSpacing: 0.4 },
  liveText:  { color: successText },
});

export default function LiveBanner({
  session,
  onJoin,
}: {
  session: Session;
  onJoin: () => void;
}) {
  return (
    <View style={styles.liveBanner}>
      <View style={{ flex: 1 }}>
        <Text style={styles.liveTitle}>Live soon</Text>
        <Text style={styles.liveText}>
          {session.topic} · {dayjs(session.startsAt).format('ddd, HH:mm')}–{dayjs(session.endsAt).format('HH:mm')}
        </Text>
      </View>
      <PrimaryButton label="Join" onPress={onJoin} icon="videocam" />
    </View>
  );
}

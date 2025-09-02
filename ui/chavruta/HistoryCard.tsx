// app/chavruta/components/HistoryCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { colors } from 'src/styles/theme';
import SmallButton from '@ui/chavruta/SmallButton';
import Tag from '@ui/chavruta/Tag';
import { Session } from 'src/types';

// Map your theme safely (supports both your keys and our fallbacks)
const t = colors as any;
const C = {
  cardMuted: t.cardMuted ?? t.surface ?? '#0f141e',
  text: t.text ?? t.textPrimary ?? '#f3f6fb',
  sub: t.sub ?? t.textSecondary ?? '#a7b1c2',
  border: t.border ?? 'rgba(255,255,255,0.08)',
};

const styles = StyleSheet.create({
  cardMuted: {
    backgroundColor: C.cardMuted,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 10,
  },
  cardTitle: { color: C.text, fontSize: 16, fontWeight: '700' },
  cardSub: { color: C.sub, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
});

export default function HistoryCard({ session, onReview }: { session: Session; onReview: () => void }) {
  return (
    <View style={styles.cardMuted}>
      <Text style={styles.cardTitle}>{session.topic}</Text>
      <Text style={styles.cardSub}>
        With {session.chavrutaB.name} · {dayjs(session.startsAt).format('MMM D')}
      </Text>
      <View style={styles.row}>
        <Tag text="Completed" />
        <View style={{ flex: 1 }} />
        <SmallButton label="Notes" onPress={onReview} icon="document-text-outline" />
      </View>
    </View>
  );
}

// app/chavruta/components/ScheduleRow.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import Tag from '@ui/chavruta/Tag';
import { Session } from 'src/types';
import { C } from 'src/styles/theme'; // our normalized light palette

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.card,     // white card
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,       // subtle light border
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rowTitle: { color: C.text, fontWeight: '700', fontSize: 16 },
  rowSub: { color: C.sub, marginTop: 2, fontSize: 13 },
});

export default function ScheduleRow({ session }: { session: Session }) {
  return (
    <View style={styles.rowItem}>
      <View>
        <Text style={styles.rowTitle}>
          {dayjs(session.startsAt).format('ddd, MMM D')}
        </Text>
        <Text style={styles.rowSub}>
          {dayjs(session.startsAt).format('HH:mm')}–{dayjs(session.endsAt).format('HH:mm')} · {session.topic}
        </Text>
      </View>

      {/* Keep Tag simple (defaults inside Tag.tsx) */}
      <Tag text={session.status} />
    </View>
  );
}

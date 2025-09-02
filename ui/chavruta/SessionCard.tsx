// app/chavruta/components/SessionCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import SmallButton from '@ui/chavruta/SmallButton';
import Tag from '@ui/chavruta/Tag';
import { Session } from 'src/types';
import { C } from 'src/styles/theme';

type Props = {
  session: Session;
  onJoin: () => void;
  onChat: () => void;
  onSource: () => void;
};

export default function SessionCard({ session, onJoin, onChat, onSource }: Props) {
  const partnerName = session?.chavrutaB?.name ?? 'Partner';
  const startStr = dayjs(session.startsAt).format('MMM D, HH:mm');
  const endStr = dayjs(session.endsAt).format('HH:mm');

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{session.topic}</Text>
      <Text style={styles.cardSub}>
        With {partnerName} · {startStr} – {endStr}
      </Text>

      <View style={styles.row}>
        <Tag text={session.status === 'scheduled' ? 'Scheduled' : session.status} />
        <View style={{ flex: 1 }} />
        <SmallButton label="Join" onPress={onJoin} icon="videocam" />
        <SmallButton label="Chat" onPress={onChat} icon="chatbubble-ellipses-outline" />
        <SmallButton label="Sources" onPress={onSource} icon="book-outline" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 12,
  },
  cardTitle: { color: C.text, fontSize: 16, fontWeight: '700' },
  cardSub: { color: C.sub, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
});

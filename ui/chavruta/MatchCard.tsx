// app/chavruta/components/MatchCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SmallButton from '@ui/chavruta/SmallButton';
import { ChavrutaUser } from 'src/types';

const C = {
  card: '#FFFFFF',          // white card background
  text: '#3A2D1F',          // dark brown text
  sub: '#6B5E55',           // muted subtext
  border: 'rgba(0,0,0,0.06)', // subtle border
  accent: '#FBBF24',        // warm orange
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { 
    color: C.text, 
    fontSize: 16, 
    fontWeight: '700' 
  },
  cardSub: { 
    color: C.sub, 
    marginTop: 4,
    fontSize: 13,
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginTop: 10 
  },
});

export default function MatchCard({ user, onInvite }: { user: ChavrutaUser; onInvite: () => void }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{user.name}</Text>
      <Text style={styles.cardSub}>
        Level: {user.level} · {user.tags?.slice(0,3).join(' • ')}
      </Text>
      <View style={styles.row}>
        {/* SmallButton should also be styled to match your orange accent */}
        <SmallButton label="Invite" onPress={onInvite} icon="send-outline" />
      </View>
    </View>
  );
}

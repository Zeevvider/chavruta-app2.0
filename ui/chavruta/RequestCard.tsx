import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SmallButton from './SmallButton';
import { colors, spacing } from '@theme';       // <- alias to src/styles/theme (tsconfig paths)
import { Request } from '@types';               // <- alias to src/types (or use a relative path)

const C = {
  card:   colors.surface,
  text:   colors.textPrimary,
  sub:    colors.textSecondary,
  border: colors.border,
  brand:  colors.accent,
};

export default function RequestCard({
  request,
  onAccept,
  onDecline,
}: {
  request: Request;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{request.from.name}</Text>
      <Text style={styles.sub}>{request.topic}</Text>

      <View style={styles.row}>
        <SmallButton label="Decline" onPress={onDecline} icon="close" />
        <View style={{ width: spacing.sm }} />
        <SmallButton label="Accept" onPress={onAccept} icon="checkmark" type="primary" />
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
    marginBottom: spacing.md,
  },
  title: {
    color: C.text,
    fontSize: 16,
    fontWeight: '700',
  },
  sub: {
    color: C.sub,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});

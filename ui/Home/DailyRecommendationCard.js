import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DailyRecommendationCard({
  hebrewTitle = 'משנה ברכות',
  englishTitle = 'Mishnah Berakhot 1:1',
  timeLabel = '12 min',
  onPress = () => {},
}) {
  return (
    <View
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`${hebrewTitle}, ${englishTitle}, about ${timeLabel}`}
      onTouchEnd={onPress}
    >
      <View style={styles.textWrap}>
        <Text style={styles.hebrew}>{hebrewTitle}</Text>
        <Text style={styles.english}>{englishTitle}</Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>{timeLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#FFF5EA',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    // subtle shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  textWrap: {
    flexShrink: 1,
  },
  hebrew: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'right',
    color: '#2a231b',
    marginBottom: 4,
    writingDirection: 'rtl', // ensures RTL alignment
  },
  english: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a4035',
  },
  badge: {
    backgroundColor: '#F8B400',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2a231b',
  },
});

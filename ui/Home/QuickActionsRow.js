import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function QuickAction({ label, icon, lib = 'Ionicons', onPress }) {
  const Icon = lib === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.iconWrap}>
        <Icon name={icon} size={28} />
      </View>
      <Text style={styles.tileLabel}>{label}</Text>
    </Pressable>
  );
}

export default function QuickActionsRow({
  onPressLibrary = () => {},
  onPressShiurim = () => {},
  onPressChavruta = () => {},
}) {
  return (
    <View style={styles.row}>
      <QuickAction
        label="Library"
        icon="book-outline"
        lib="Ionicons"
        onPress={onPressLibrary}
      />
      <QuickAction
        label="Shiurim"
        icon="headset-outline"
        lib="Ionicons"
        onPress={onPressShiurim}
      />
      <QuickAction
        label="Find a Chavruta"
        icon="handshake"
        lib="MaterialCommunityIcons" // has a nice handshake icon
        onPress={onPressChavruta}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
    marginTop: 24,
    justifyContent: 'space-around',
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: '#FFF5EA', // soft cream like your mock
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tileLabel: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2a231b',
  },
});

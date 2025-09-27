// app/chavruta/components/Tabs.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { C } from 'src/styles/theme';

type TabKey = 'active' | 'matches' | 'requests' | 'calendar';

export default function Tabs({
  value,
  onChange,
}: {
  value: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const items: { key: TabKey; label: string }[] = [
    { key: 'active', label: 'Active' },
    { key: 'matches', label: 'Matches' },
    { key: 'requests', label: 'Requests' },
    { key: 'calendar', label: 'calendar' },
  ];

  return (
    <View style={styles.tabs}>
      {items.map((it) => {
        const active = value === it.key;
        return (
          <Pressable
            key={it.key}
            onPress={() => onChange(it.key)}
            style={[styles.tabBtn, active && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, active && styles.tabTextActive]}>
              {it.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: C.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  tabText: {
    color: C.sub,
    fontWeight: '700',
  },
  tabTextActive: {
    color: C.text,
  },
});

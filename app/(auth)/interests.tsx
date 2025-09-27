// app/onboarding/interests.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const COLORS = {
  cream: '#F7EBDD',
  text: '#1E1E1E',
  muted: '#6B7280',
  line:  '#E5E7EB',
  green: '#ADC2A5',
  white: '#FFFFFF',
};

const OPTIONS = [
  'Halacha',
  'Gemara (Talmud)',
  'Chumash (Torah)',
  'Mishnah',
  'Musar (Ethics)',
  'Tanach (Bible)',
  'Jewish History',
  'Hashkafa (Philosophy)',
  'Parashat Hashavua',
  'Chassidus',
  'Hebrew Language',
  'Tehillim (Psalms)',
  'Halacha Lemaaseh',
  'Ayin Yaakov',
  'Midrash',
];

export default function Interests() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(['Halacha', 'Hebrew Language', 'Tehillim (Psalms)']);

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  const canContinue = useMemo(() => selected.length > 0, [selected]);

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>What Torah topics are you{'\n'}interested in?</Text>

        <View style={s.wrap}>
          {OPTIONS.map((label) => (
            <Chip
              key={label}
              label={label}
              active={selected.includes(label)}
              onPress={() => toggle(label)}
            />
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={[s.primaryBtn, !canContinue && s.disabled]}
        disabled={!canContinue}
        onPress={() => router.push('/(auth)/boardend')}
      >
        <Text style={s.primaryText}>Continue</Text>
      </Pressable>
    </View>
  );
}

function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={[cs.base, active ? cs.active : cs.inactive]}>
      <Text style={[cs.text, active ? cs.textActive : cs.textInactive]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  content: { padding: 24, paddingBottom: 40 },
  title: {
    fontSize: 22, fontWeight: '800', color: COLORS.text, textAlign: 'center', marginBottom: 16,
  },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  primaryBtn: {
    backgroundColor: COLORS.green, paddingVertical: 16, alignItems: 'center',
    borderTopLeftRadius: 16, borderTopRightRadius: 16, marginHorizontal: 16, marginBottom: 16, borderRadius: 16,
  },
  primaryText: { color: 'white', fontWeight: '700', fontSize: 16 },
  disabled: { opacity: 0.6 },
});

const cs = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
  },
  active: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  inactive: { backgroundColor: COLORS.white },
  text: { fontWeight: '700' },
  textActive: { color: 'white' },
  textInactive: { color: COLORS.text },
});

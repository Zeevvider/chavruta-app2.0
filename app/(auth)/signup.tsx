// app/(auth)/signup.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { supabase } from 'others/config/lib/supabase';

const COLORS = {
  cream: '#F7EBDD',
  text: '#1E1E1E',
  muted: '#6B7280',
  line: '#E5E7EB',
  green: '#ADC2A5',
  white: '#FFFFFF',
};

export default function Signup() {
  const router = useRouter();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [langs, setLangs] = useState<string[]>(['English']); // preselect English
  const [loading, setLoading] = useState(false);

  const canContinue = useMemo(
    () => !!name.trim() && !!gender && langs.length > 0 && !loading,
    [name, gender, langs, loading]
  );

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow photo access to add a picture.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });
    if (!res.canceled) setPhotoUri(res.assets[0].uri);
  };

  const toggleLang = (code: string) => {
    setLangs((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]
    );
  };

  // Save (or upsert) profile for the currently signed-in user.
  // If the user isn't signed in yet, we skip saving (no crash) and still move on.
  const saveProfileIfSignedIn = async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return; // not signed in yet (dev flow / skip)

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: auth.user.id,
        name: name.trim(),
        gender,
        languages: langs,
        avatar_url: null, // TODO: upload to Storage and set URL
        onboarding_done: false,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      // Non-fatal: let the user continue onboarding anyway.
      console.warn('profiles upsert failed:', error);
    }
  };

  const onContinue = async () => {
    setLoading(true);
    try {
      await saveProfileIfSignedIn();
      router.push('/(auth)/interests'); // next step in the flow
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Set up your profile</Text>

      <Pressable style={s.avatar} onPress={pickPhoto}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={s.avatarImg} />
        ) : (
          <Text style={s.avatarText}>Add Photo</Text>
        )}
      </Pressable>

      <TextInput
        style={s.input}
        placeholder="Your name"
        placeholderTextColor="#9BA3AF"
        value={name}
        onChangeText={setName}
      />

      <Text style={s.sectionLabel}>Select your gender</Text>
      <View style={s.row}>
        <Chip
          label="Male"
          active={gender === 'male'}
          onPress={() => setGender('male')}
        />
        <Chip
          label="Female"
          active={gender === 'female'}
          onPress={() => setGender('female')}
        />
      </View>

      <Text style={[s.sectionLabel, { marginTop: 16 }]}>Choose your language</Text>
      <View style={s.wrap}>
        {['English', 'עברית', 'Español', 'Français'].map((l) => (
          <Chip
            key={l}
            label={l}
            active={langs.includes(l)}
            onPress={() => toggleLang(l)}
            pill
          />
        ))}
      </View>

      <Pressable
        style={[s.primaryBtn, !canContinue && s.disabled]}
        onPress={onContinue}
        disabled={!canContinue}
      >
        <Text style={s.primaryText}>{loading ? 'Please wait…' : 'Continue'}</Text>
      </Pressable>
    </View>
  );
}

/** --- Small Chip component (inline to keep this file self-contained) --- */
function Chip({
  label,
  active,
  onPress,
  pill,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  pill?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        cs.base,
        pill ? cs.pill : cs.rounded,
        active ? cs.active : cs.inactive,
      ]}
    >
      <Text style={[cs.text, active ? cs.textActive : cs.textInactive]}>
        {label}
      </Text>
    </Pressable>
  );
}

/** --- Styles --- */
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  avatar: {
    alignSelf: 'center',
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: '#9BA3AF',
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  sectionLabel: {
    color: COLORS.text,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  primaryBtn: {
    backgroundColor: COLORS.green,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryText: { color: 'white', fontWeight: '700', fontSize: 16 },
  disabled: { opacity: 0.6 },
});

const cs = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rounded: { borderRadius: 14 },
  pill: { borderRadius: 999 },
  active: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  inactive: { backgroundColor: COLORS.white, borderColor: COLORS.green },
  text: { fontWeight: '700' },
  textActive: { color: 'white' },
  textInactive: { color: COLORS.text },
});

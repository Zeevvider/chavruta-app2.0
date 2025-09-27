// app/settings/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Item({ icon, label, onPress }: { icon: string; label: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Ionicons name={icon as any} size={20} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.root}>
      <Section title="Account">
        <Item icon="lock-closed-outline" label="Change Password" />
        <Item icon="person-add-outline" label="Linked Accounts" />
        <Item icon="shield-checkmark-outline" label="Privacy & Security" />
      </Section>

      <Section title="App Preferences">
        <Item icon="globe-outline" label="Language" onPress={() => router.push('/settings/language')} />
        <Item icon="notifications-outline" label="Notifications" />
        <Item icon="moon-outline" label="Theme" />
        <Item icon="text-outline" label="Reader & Font Size" />
      </Section>

      <Section title="Learning">
        <Item icon="flame-outline" label="Streak & Progress Backup" />
        <Item icon="download-outline" label="Offline Downloads" />
        <Item icon="sparkles-outline" label="AI & Quiz Settings" />
      </Section>

      <Section title="Community">
        <Item icon="people-outline" label="Visibility & Privacy" />
        <Item icon="ban-outline" label="Blocked Users" />
        <Item icon="share-social-outline" label="Share My Progress" />
      </Section>

      <Section title="Coins & Support">
        <Item icon="wallet-outline" label="Buy Coins" />
        <Item icon="gift-outline" label="Donate Coins" />
        <Item icon="star-outline" label="Subscription / Premium" />
      </Section>

      <Section title="Device & Data">
        <Item icon="trash-outline" label="Clear Cache" />
        <Item icon="download-outline" label="Export Learning History" />
        <Item icon="close-circle-outline" label="Delete Account" />
      </Section>

      <Section title="About">
        <Item icon="information-circle-outline" label="About" />
        <Item icon="document-text-outline" label="Terms of Service" />
        <Item icon="shield-outline" label="Privacy Policy" />
        <Item icon="chatbubble-outline" label="Contact Us" />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7EBDD',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 12,
    color: '#333',
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
});

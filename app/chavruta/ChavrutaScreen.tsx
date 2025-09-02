// app/chavruta/ChavrutaScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';

import { spacing } from '../../src/styles/theme';
import { Session } from '../../src/types';
import { useChavrutaData } from '../../src/hooks/useChavrutaData';

import {
  Header, Tabs, Section, LiveBanner, HistoryCard, MatchCard,
  RequestCard, ScheduleRow, PrimaryButton
} from '@ui/chavruta';


// and any separate: import SessionCard from './components/SessionCard';


import SessionCard from '@ui/chavruta/SessionCard';
import { C } from 'src/styles/theme'; 



type TabKey = 'active' | 'matches' | 'requests' | 'schedule';

export default function ChavrutaScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>('active');

  const {
    you,
    sessions,
    setSessions,
    matches,
    requests,
    setRequests,
    refreshing,
    onRefresh,
    nextLive,
  } = useChavrutaData();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Header />

        {/* Quick status / CTA */}
        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>שלום, {you.name}</Text>
            <Text style={styles.heroSub}>Ready to learn? Your level: {you.level}</Text>
          </View>
          <PrimaryButton label="Find chavruta" onPress={() => setTab('matches')} icon="search" />
        </View>

        {/* Tabs */}
        <Tabs value={tab} onChange={setTab} />

        {/* Content */}
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
        >
          {tab === 'active' && (
            <View>
              {nextLive ? (
                <LiveBanner
                  session={nextLive}
                  onJoin={() => router.push({ pathname: '/chavruta/Room/[id]', params: { id: nextLive.roomId } })}
                />
              ) : null}

              <Section title="Upcoming">
                {[...sessions]
                  .filter((s) => s.status === 'scheduled')
                  .sort((a, b) => dayjs(a.startsAt).valueOf() - dayjs(b.startsAt).valueOf())
                  .map((item) => (
                    <SessionCard
                      key={item.id}
                      session={item}
                      onJoin={() => router.push({ pathname: '/chavruta/Room/[id]', params: { id: item.roomId } })}
                      onChat={() => router.push({ pathname: '/chat', params: { with: item.chavrutaB.id } })}
                      onSource={() => router.push({ pathname: '/source', params: { topic: item.topic } })}
                    />
                  ))}
              </Section>

              <Section title="History">
                {[...sessions]
                  .filter((s) => s.status === 'complete')
                  .sort((a, b) => dayjs(b.startsAt).valueOf() - dayjs(a.startsAt).valueOf())
                  .map((item) => (
                    <HistoryCard
                      key={item.id}
                      session={item}
                      onReview={() => router.push({ pathname: '/notes', params: { id: item.id } })}
                    />
                  ))}
              </Section>
            </View>
          )}

          {tab === 'matches' && (
            <Section title="Suggested matches">
              {matches.map((u) => (
                <MatchCard
                  key={u.id}
                  user={u}
                  onInvite={() => {
                    setRequests((prev) => [
                      {
                        id: Math.random().toString(36).slice(2),
                        from: u,
                        topic: 'Choshen Mishpat 180',
                        createdAt: new Date().toISOString(),
                      },
                      ...prev,
                    ]);
                  }}
                />
              ))}
            </Section>
          )}

          {tab === 'requests' && (
            <Section title="Requests">
              {requests.map((req) => (
                <RequestCard
                  key={req.id}
                  request={req}
                  onAccept={() => {
                    const start = dayjs().add(1, 'day').hour(9).minute(0).second(0);
                    const newSession: Session = {
                      id: 's' + Math.random().toString(36).slice(2),
                      chavrutaA: { ...you },
                      chavrutaB: req.from,
                      topic: req.topic,
                      startsAt: start.toISOString(),
                      endsAt: start.add(1, 'hour').toISOString(),
                      status: 'scheduled',
                      roomId: 'room-' + Math.random().toString(36).slice(2),
                    };
                    setSessions((prev) => [newSession, ...prev]);
                    setRequests((prev) => prev.filter((r) => r.id !== req.id));
                    setTab('active');
                  }}
                  onDecline={() => setRequests((prev) => prev.filter((r) => r.id !== req.id))}
                />
              ))}
            </Section>
          )}

          {tab === 'schedule' && (
            <Section title="Your schedule">
              {[...sessions]
                .sort((a, b) => dayjs(a.startsAt).valueOf() - dayjs(b.startsAt).valueOf())
                .map((item) => (
                  <ScheduleRow key={item.id} session={item} />
                ))}
            </Section>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  container: { flex: 1, paddingHorizontal: spacing?.lg || 16 },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: C.border,
  },
  heroTitle: { color: C.text, fontSize: 20, fontWeight: '700' },
  heroSub: { color: C.sub, marginTop: 4 },
});

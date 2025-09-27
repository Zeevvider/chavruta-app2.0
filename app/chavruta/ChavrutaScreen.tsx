// app/chavruta/ChavrutaScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';
import { Calendar } from 'react-native-big-calendar';

import { spacing, C } from '../../src/styles/theme';
import { Session } from '../../src/types';
import { useChavrutaData } from '../../src/hooks/useChavrutaData';

import {
  Tabs,
  Section,
  LiveBanner,
  HistoryCard,
  MatchCard,
  RequestCard,
} from '@ui/chavruta';

// New centralized components
import { AppHeader, HeroSection } from '../../src/components/chavruta';

import SessionCard from '@ui/chavruta/SessionCard';

type TabKey = 'active' | 'matches' | 'requests' | 'calendar';

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
  }: ReturnType<typeof useChavrutaData> = useChavrutaData();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <AppHeader />

        <HeroSection
          userName={you.name}
          userLevel={you.level}
          onFindChavrutaPress={() => setTab('matches')}
        />

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
                  onJoin={() =>
                    router.push({ pathname: '/chavruta/Room/[id]', params: { id: nextLive.roomId } })
                  }
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
                      onJoin={() =>
                        router.push({ pathname: '/chavruta/Room/[id]', params: { id: item.roomId } })
                      }
                      onChat={() =>
                        router.push({ pathname: '/chat', params: { with: item.chavrutaB.id } })
                      }
                      onSource={() =>
                        router.push({ pathname: '/source', params: { topic: item.topic } })
                      }
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
                      onReview={() =>
                        router.push({ pathname: '/notes', params: { id: item.id } })
                      }
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

          {tab === 'calendar' && (
            <Section title="Calendar">
              <View style={{ height: 600 }}>
                <Calendar
                  events={sessions.map((s) => ({
                    title: s.topic,
                    start: dayjs(s.startsAt).toDate(),
                    end: dayjs(s.endsAt).toDate(),
                  }))}
                  height={600}
                  mode="week"
                  onPressCell={(date) => {
                    console.log('Tapped on slot:', date);
                    // TODO: open modal to add new chavruta session
                  }}
                />
              </View>
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
});

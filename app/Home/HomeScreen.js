// app/Home/HomeScreen.js
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

import HeroGreeting from '../../ui/Home/HeroGreeting';
import PrimaryCTA from '../../ui/Home/PrimaryCTA';
import QuickActionsRow from '../../ui/Home/QuickActionsRow';
import DailyRecommendationCard from '../../ui/Home/DailyRecommendationCard';

const character = require('../../others/config/assets/images/male.png');

export default function HomeScreen() {
  const router = useRouter();
  const { width: W } = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HeroGreeting
          characterSrc={character}
          charWidth={Math.min(W * 0.55, 340)}
          charBottom={-320}
          charCenter
          bubbleWidth={180}
          bubbleMinHeight={120}
          bubbleRight={16}
          bubbleTopOffset={12}
          headNudgeY={-8}
          bubbleColor="#2BB0B3"
          tailSide="left"
          tailOffset={0.58}
          tailType="rounded"
          topText="Shalom Zev,"
          bottomText="Ready for another step in your Torah journey?"
        />

        <PrimaryCTA
          line1="Continue Learning"
          line2="Mishnah Berakhot 1:1"
          onPress={() =>
            router.push({
              pathname: '/game/level-map',
              params: { masechet: 'Pirkei Avot', perek: '1' },
            })
          }
        />

        <QuickActionsRow
          onPressLibrary={() => router.push('/library')}
          onPressShiurim={() => router.push('/shiurim')}
          onPressChavruta={() => router.push('/chavruta')}
        />

        <DailyRecommendationCard
          hebrewTitle="היום כך וההלכה מורבה"
          englishTitle="Pirkei Avot"
          timeLabel="12 min"
          onPress={() => router.push('/daily')}
        />

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFF9F2' },
  content: {
    paddingTop: 8,
    paddingBottom: 24,
  },
});

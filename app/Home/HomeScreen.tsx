// app/Home/HomeScreen.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

// New centralized components
import { HeroGreeting, PrimaryCTA, TopBar } from '../../src/components/home';
import QuickActionsRow from '../../ui/Home/QuickActionsRow';
import DailyRecommendationCard from '../../ui/Home/DailyRecommendationCard';

// Design system
import { colors } from '../../src/styles/design-system';

const character = require('../../others/config/assets/images/male.png');

export default function HomeScreen() {
  const router = useRouter();
  const { width: W } = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.root}>
      <TopBar
        onProfilePress={() => router.push('/profile')}
        profileImageUri="https://i.pravatar.cc/100"
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HeroGreeting
          characterSrc={character}
          charWidth={Math.min(W * 0.55, 340)}
          charBottom={-320}
          charCenter
          charRight={0}  
          bubbleWidth={180}
          bubbleMinHeight={120}
          bubbleRight={16}
          bubbleTopOffset={12}
          headNudgeY={-8}
          bubbleColor={colors.accent.teal}
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
  root: { 
    flex: 1, 
    backgroundColor: colors.background.primary 
  },
  content: {
    paddingTop: 60, // push down to leave room for profile button
    paddingBottom: 24,
  },
});

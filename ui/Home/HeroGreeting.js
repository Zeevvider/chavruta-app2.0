// others/config/components/HeroGreeting.js
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Text,             // ✅ import Text
} from 'react-native';
import SpeechBubble from './SpeechBubble';
import CharacterFigure from './CharacterFigure';

const { width: W } = Dimensions.get('window');

export default function HeroGreeting({
  characterSrc,
  charWidth = Math.min(0.55 * W, 340),
  charBottom = -10,
  charCenter = true,
  charRight,

  bubbleWidth = 180,
  bubbleMinHeight = 110,
  bubbleRight = 16,
  bubbleTopOffset = 12,    // base gap under status bar
  headNudgeY = -10,        // fine adjust bubble vertically near head
  bubbleColor = '#2BB0B3',
  tailSide = 'left',
  tailOffset = 0.58,
  tailType = 'rounded',

  topText = 'Shalom Zev,',
  bottomText = 'Ready for another step in your Torah journey?',
}) {
  const safeTop = (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0);
  const charLeft = charCenter ? (W - charWidth) / 2 : undefined;

  const charH = charWidth / 0.58; // aspect ratio inverse
  const bubbleTop = safeTop + bubbleTopOffset + charH * 0.15 + headNudgeY;

  return (
    <View style={styles.wrap}>
      {/* Bubble first so character can overlap */}
      <View style={[styles.bubbleAbs, { right: bubbleRight, top: bubbleTop }]}>
        <SpeechBubble
          width={bubbleWidth}
          minHeight={bubbleMinHeight}
          color={bubbleColor}
          tailSide={tailSide}
          tailOffset={tailOffset}
          tailType={tailType}
        >
          <View>
            <Text style={{ fontSize: 22, fontWeight: '900', color: '#13110e' }}>
              {topText}
            </Text>
            <Text style={{ marginTop: 4, fontSize: 14, fontWeight: '700', color: '#13110e' }}>
              {bottomText}
            </Text>
          </View>
        </SpeechBubble>
      </View>

      <CharacterFigure
        source={characterSrc}
        width={charWidth}
        bottom={charBottom}
        left={charCenter ? charLeft : undefined}
        right={charCenter ? undefined : (charRight ?? 16)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative', paddingHorizontal: 16, marginBottom: 24, minHeight: 160 },
  bubbleAbs: { position: 'absolute', zIndex: 1 },
});

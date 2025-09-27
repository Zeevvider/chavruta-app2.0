// src/components/home/HeroGreeting.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { spacing } from '../../styles/design-system';
import SpeechBubble from './SpeechBubble';
import CharacterFigure from './CharacterFigure';

const { width: W } = Dimensions.get('window');

export interface HeroGreetingProps {
  characterSrc: ImageSourcePropType;
  charWidth?: number;
  charBottom?: number;
  charCenter?: boolean;
  charRight?: number;
  charLeft?: number;
  
  bubbleWidth?: number;
  bubbleMinHeight?: number;
  bubbleRight?: number;
  bubbleTopOffset?: number;
  headNudgeY?: number;
  bubbleColor?: string;
  tailSide?: 'left' | 'right' | 'top' | 'bottom';
  tailOffset?: number;
  tailType?: 'rounded' | 'pointy';
  
  topText?: string;
  bottomText?: string;
  
  style?: ViewStyle;
  testID?: string;
}

export default function HeroGreeting({
  characterSrc,
  charWidth = Math.min(0.55 * W, 340),
  charBottom = -10,
  charCenter = true,
  charRight,
  charLeft,
  
  bubbleWidth = 180,
  bubbleMinHeight = 110,
  bubbleRight = 16,
  bubbleTopOffset = 12,
  headNudgeY = -10,
  bubbleColor = '#2BB0B3',
  tailSide = 'left',
  tailOffset = 0.58,
  tailType = 'rounded',
  
  topText = 'Shalom Zev,',
  bottomText = 'Ready for another step in your Torah journey?',
  
  style,
  testID,
}: HeroGreetingProps) {
  const safeTop = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0;
  const calculatedCharLeft = charCenter ? (W - charWidth) / 2 : charLeft;

  const charH = charWidth / 0.58; // aspect ratio inverse
  const bubbleTop = safeTop + bubbleTopOffset + charH * 0.15 + headNudgeY;

  return (
    <View style={[styles.container, style]} testID={testID}>
      {/* Bubble first so character can overlap */}
      <View style={[styles.bubbleContainer, { right: bubbleRight, top: bubbleTop }]}>
        <SpeechBubble
          width={bubbleWidth}
          minHeight={bubbleMinHeight}
          color={bubbleColor}
          tailSide={tailSide}
          tailOffset={tailOffset}
          tailType={tailType}
        >
          <View>
            <SpeechBubble.Text variant="h4" style={styles.topText}>
              {topText}
            </SpeechBubble.Text>
            <SpeechBubble.Text variant="bodySmall" style={styles.bottomText}>
              {bottomText}
            </SpeechBubble.Text>
          </View>
        </SpeechBubble>
      </View>

      <CharacterFigure
        source={characterSrc}
        width={charWidth}
        bottom={charBottom}
        left={charCenter ? calculatedCharLeft : charLeft}
        right={charCenter ? undefined : charRight}
        testID="character-figure"
      />
    </View>
  );
}

// Add static methods to SpeechBubble for better API
SpeechBubble.Text = ({ children, variant, style, ...props }: any) => {
  const textStyles = [
    variant === 'h4' ? styles.topText : styles.bottomText,
    style,
  ];
  
  return (
    <View style={textStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
    minHeight: 160,
  },
  bubbleContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  topText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#13110e',
  },
  bottomText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#13110e',
  },
});

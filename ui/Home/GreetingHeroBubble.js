// others/config/components/GreetingHeroBubble.js
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

const { width: W } = Dimensions.get('window');

export default function GreetingHeroBubble({
  name = 'Zev',
  title = 'Shalom',
  subtitle = 'Ready for another step in your Torah journey?',
  imageSource,
  bubbleColor = '#26A9AE',
  textColor = '#13110e',
  // tuning props
  bubbleTop = 12,           // extra space below status bar
  tailYFactor = 1,       // 0..1 vertical tail position
  bubbleOffsetX = 24,        // move bubble horizontally (+right, -left)
  bubbleOffsetY = -290,        // move bubble vertically (+down, -up)
  bubbleWidth  = 170,           // optional explicit width
  bubbleHeight,             // optional explicit height

  // character placement
  charBottom = -6,
  charCenter = true,        // center by default
  charRight,                // if you want right-align, pass a number
  charWidth = Math.min(W * 0.58, 360),
}) {
  const H_MARGIN = 16;

  const bubbleW = bubbleWidth ?? Math.min(W - H_MARGIN * 2, 680);
  const bubbleH = bubbleHeight ?? Math.max(136, Math.min(176, W * 0.34));
  const radius = 28;

  const tailX = 24; // left tail
  const tailW = 22, tailH = 18;
  const tailY = bubbleH * tailYFactor;

  const charAR = 0.58; // art aspect ratio (w/h)
  const charH = charWidth / charAR;

  // Android safe top spacing
  const safeTop = (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0) + bubbleTop;

  // character horizontal position
  const charStylePos = charCenter
    ? { left: (W - charWidth) / 2 }     // centered
    : { right: (charRight ?? 16) };     // or right-aligned

  return (
    <View style={[styles.hero, { paddingTop: safeTop }]}>
      {/* Speech bubble — docked top-right with optional offset */}
      <View
        style={[
          styles.bubbleWrap,
          {
            width: bubbleW,
            height: bubbleH,
            transform: [{ translateX: bubbleOffsetX }, { translateY: bubbleOffsetY }],
          },
        ]}
      >
        <Svg width={bubbleW} height={bubbleH}>
          <Rect width={bubbleW} height={bubbleH} rx={radius} ry={radius} fill={bubbleColor} />
          <Path
            d={`M ${tailX} ${tailY} L ${tailX + tailW} ${tailY - tailH / 2} L ${tailX + tailW} ${tailY + tailH / 2} Z`}
            fill={bubbleColor}
          />
        </Svg>

        <View style={styles.textBlock} pointerEvents="none">
          <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
            {title} {name},
          </Text>
          <Text style={[styles.subtitle, { color: textColor }]} numberOfLines={3}>
            {subtitle}
          </Text>
        </View>
      </View>

      {/* Character */}
      {imageSource && (
        <Image
          source={imageSource}
          style={[
            styles.character,
            { width: charWidth, height: charH, bottom: charBottom, ...charStylePos },
          ]}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 16,
    marginBottom: 24, // lets the CTA peek to invite scroll
    minHeight: 140,
  },
  bubbleWrap: {
    position: 'relative',
    alignSelf: 'flex-end',   // ⬅️ dock to right
    marginRight: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 5,
    zIndex: 1,
  },
  textBlock: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: 16,
  },
  title: { fontSize: 30, fontWeight: '900', letterSpacing: 0.2 },
  subtitle: { marginTop: 8, fontSize: 18, lineHeight: 24, fontWeight: '700' },
  character: { position: 'absolute', zIndex: 2 },
});

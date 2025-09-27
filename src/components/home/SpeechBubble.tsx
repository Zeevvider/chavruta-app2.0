// src/components/home/SpeechBubble.tsx
import React from 'react';
import { View, Text, StyleSheet, Platform, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/design-system';

export type TailSide = 'left' | 'right' | 'top' | 'bottom';
export type TailType = 'rounded' | 'pointy';

export interface SpeechBubbleProps {
  children?: React.ReactNode;
  width?: number;
  minHeight?: number;
  radius?: number;
  padding?: number;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
  
  // Tail configuration
  tailSide?: TailSide;
  tailOffset?: number; // 0..1 along that side
  tailType?: TailType;
  tailSize?: number; // rounded tail size (diamond side)
  tailWidth?: number; // pointy tail base width
  tailHeight?: number; // pointy tail height
  tailRadius?: number; // rounded tail corner
  tailInset?: number; // keep away from rounded corners
}

export default function SpeechBubble({
  children,
  width = 180,
  minHeight = 110,
  radius = 22,
  padding = 14,
  color = colors.accent.teal,
  textColor = colors.text.primary,
  style,
  tailSide = 'left',
  tailOffset = 0.55,
  tailType = 'rounded',
  tailSize = 14,
  tailWidth = 16,
  tailHeight = 12,
  tailRadius = 6,
  tailInset = 10,
}: SpeechBubbleProps) {
  const bubbleStyles = [
    styles.bubble,
    {
      width,
      minHeight,
      borderRadius: radius,
      backgroundColor: color,
      padding,
      ...(Platform.OS === 'android' ? { elevation: 4 } : shadows.md),
    },
    style,
  ];

  const tailPos = getTailPosition({
    tailSide,
    tailOffset,
    width,
    minHeight,
    radius,
    tailInset,
    tailWidth,
    tailHeight,
    tailSize,
  });

  return (
    <View style={{ width, position: 'relative' }}>
      <View style={bubbleStyles}>
        {children ?? (
          <>
            <Text style={[styles.topText, { color: textColor }]}>
              Shalom Zev,
            </Text>
            <Text style={[styles.bottomText, { color: textColor }]}>
              Ready for another step in your Torah journey?
            </Text>
          </>
        )}
      </View>

      {/* Tail */}
      {tailType === 'rounded' ? (
        <View
          style={[
            styles.tailBase,
            tailPos,
            {
              width: tailSize,
              height: tailSize,
              backgroundColor: color,
              borderRadius: tailRadius,
              transform: [
                ...(tailPos.transform || []),
                { rotate: (tailSide === 'left' || tailSide === 'bottom') ? '-45deg' : '45deg' },
              ],
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.tailBase,
            tailPos,
            triangleStyle(tailSide, color, tailWidth, tailHeight),
          ]}
        />
      )}
    </View>
  );
}

function getTailPosition({
  tailSide,
  tailOffset,
  width,
  minHeight,
  radius,
  tailInset,
  tailWidth,
  tailHeight,
  tailSize,
}: {
  tailSide: TailSide;
  tailOffset: number;
  width: number;
  minHeight: number;
  radius: number;
  tailInset: number;
  tailWidth: number;
  tailHeight: number;
  tailSize: number;
}) {
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  const off = clamp(tailOffset, 0, 1);
  const guard = radius + tailInset;

  const pos: any = { position: 'absolute', transform: [] };

  if (tailSide === 'left' || tailSide === 'right') {
    const usable = Math.max(0, minHeight - guard * 2);
    const y = guard + usable * off;
    pos.top = y;
    pos.transform.push({ translateY: -((tailHeight || tailSize) / 2) });
    if (tailSide === 'left') pos.left = -1;
    else pos.right = -1;
  } else {
    const usable = Math.max(0, width - guard * 2);
    const x = guard + usable * off;
    pos.left = x;
    pos.transform.push({ translateX: -((tailWidth || tailSize) / 2) });
    if (tailSide === 'top') pos.top = -1;
    else pos.bottom = -1;
  }

  return pos;
}

function triangleStyle(side: TailSide, color: string, w: number, h: number) {
  return {
    width: 0,
    height: 0,
    ...(side === 'left' && {
      borderTopWidth: h / 2,
      borderBottomWidth: h / 2,
      borderRightWidth: w,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: color,
    }),
    ...(side === 'right' && {
      borderTopWidth: h / 2,
      borderBottomWidth: h / 2,
      borderLeftWidth: w,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: color,
    }),
    ...(side === 'top' && {
      borderLeftWidth: w / 2,
      borderRightWidth: w / 2,
      borderBottomWidth: h,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: color,
    }),
    ...(side === 'bottom' && {
      borderLeftWidth: w / 2,
      borderRightWidth: w / 2,
      borderTopWidth: h,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: color,
    }),
  };
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: borderRadius.xl,
  },
  topText: {
    ...typography.styles.h4,
    fontWeight: typography.weights.black,
  },
  bottomText: {
    ...typography.styles.bodySmall,
    marginTop: spacing[1],
    fontWeight: typography.weights.bold,
  },
  tailBase: {
    position: 'absolute',
  },
});

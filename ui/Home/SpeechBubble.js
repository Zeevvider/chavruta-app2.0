import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

/** Pure RN speech bubble with customizable tail (no SVG). */
export default function SpeechBubble({
  width = 180,
  minHeight = 110,
  radius = 22,
  padding = 14,
  color = '#2BB0B3',
  textColor = '#13110e',
  style,
  children,

  // tail config
  tailSide = 'left',       // 'left' | 'right' | 'top' | 'bottom'
  tailOffset = 0.55,       // 0..1 along that side
  tailType = 'rounded',    // 'rounded' | 'pointy'
  tailSize = 14,           // rounded tail size (diamond side)
  tailWidth = 16,          // pointy tail base width
  tailHeight = 12,         // pointy tail height
  tailRadius = 6,          // rounded tail corner
  tailInset = 10,          // keep away from rounded corners
}) {
  const bubbleStyles = [
    styles.bubble,
    {
      width,
      minHeight,
      borderRadius: radius,
      backgroundColor: color,
      padding,
      ...(Platform.OS === 'android' ? { elevation: 4 } : {
        shadowColor: '#000', shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 6 }, shadowRadius: 12
      })
    },
    style,
  ];

  const tailPos = getTailPosition({ tailSide, tailOffset, width, minHeight, radius, tailInset, tailWidth, tailHeight, tailSize });

  return (
    <View style={{ width, position: 'relative' }}>
      <View style={bubbleStyles}>
        {children ?? (
          <>
            <Text style={[styles.top, { color: textColor }]}>Shalom Zev,</Text>
            <Text style={[styles.bottom, { color: textColor }]}>Ready for another step in your Torah journey?</Text>
          </>
        )}
      </View>

      {/* TAIL */}
      {tailType === 'rounded' ? (
        <View
          style={[
            styles.tailBase, tailPos,
            {
              width: tailSize, height: tailSize, backgroundColor: color,
              borderRadius: tailRadius, transform: [...(tailPos.transform || []), { rotate: (tailSide === 'left' || tailSide === 'bottom') ? '-45deg' : '45deg' }]
            },
          ]}
        />
      ) : (
        <View style={[styles.tailBase, tailPos, triangleStyle(tailSide, color, tailWidth, tailHeight)]} />
      )}
    </View>
  );
}

function getTailPosition({ tailSide, tailOffset, width, minHeight, radius, tailInset, tailWidth, tailHeight, tailSize }) {
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const off = clamp(tailOffset, 0, 1);
  const guard = radius + tailInset;

  const pos = { position: 'absolute', transform: [] };

  if (tailSide === 'left' || tailSide === 'right') {
    const usable = Math.max(0, minHeight - guard * 2);
    const y = guard + usable * off;
    pos.top = y;
    pos.transform.push({ translateY: -((tailHeight || tailSize) / 2) });
    if (tailSide === 'left') pos.left = -1; else pos.right = -1;
  } else {
    const usable = Math.max(0, width - guard * 2);
    const x = guard + usable * off;
    pos.left = x;
    pos.transform.push({ translateX: -((tailWidth || tailSize) / 2) });
    if (tailSide === 'top') pos.top = -1; else pos.bottom = -1;
  }

  return pos;
}

function triangleStyle(side, color, w, h) {
  return {
    width: 0,
    height: 0,
    ...(side === 'left'  && { borderTopWidth: h/2, borderBottomWidth: h/2, borderRightWidth: w, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: color }),
    ...(side === 'right' && { borderTopWidth: h/2, borderBottomWidth: h/2, borderLeftWidth:  w, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor:  color }),
    ...(side === 'top'   && { borderLeftWidth: w/2, borderRightWidth: w/2, borderBottomWidth: h, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: color }),
    ...(side === 'bottom'&& { borderLeftWidth: w/2, borderRightWidth: w/2, borderTopWidth:    h, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor:    color }),
  };
}

const styles = StyleSheet.create({
  bubble: { borderRadius: 22 },
  top: { fontSize: 20, fontWeight: '900' },
  bottom: { marginTop: 4, fontSize: 14, lineHeight: 20, fontWeight: '700' },
  tailBase: { position: 'absolute' },
});

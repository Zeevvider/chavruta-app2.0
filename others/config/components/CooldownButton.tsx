import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet, GestureResponderEvent } from 'react-native';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
  readyLabel: string;              // label when enabled
  waitingLabel?: string;           // base label while waiting; seconds will be appended
  durationMs?: number;             // default 20s
  resetKey?: string | number;      // when this changes, countdown restarts
  disabled?: boolean;              // hard disable (overrides cooldown)
  style?: any;
  textStyle?: any;
  spinnerPosition?: 'left' | 'right';
};

export default function CooldownButton({
  onPress,
  readyLabel,
  waitingLabel = 'Please wait',
  durationMs = 20_000,
  resetKey,
  disabled = false,
  style,
  textStyle,
  spinnerPosition = 'right',
}: Props) {
  const [remaining, setRemaining] = useState(durationMs);
  const startAtRef = useRef<number>(Date.now());

  // restart timer when resetKey changes
  useEffect(() => {
    startAtRef.current = Date.now();
    setRemaining(durationMs);
  }, [resetKey, durationMs]);

  useEffect(() => {
    if (disabled) return; // don't tick if hard-disabled
    if (durationMs <= 0) { setRemaining(0); return; }

    const id = setInterval(() => {
      const elapsed = Date.now() - startAtRef.current;
      const left = Math.max(0, durationMs - elapsed);
      setRemaining(left);
    }, 250);

    return () => clearInterval(id);
  }, [disabled, durationMs]);

  const isCoolingDown = remaining > 0;
  const seconds = useMemo(() => Math.ceil(remaining / 1000), [remaining]);

  const label = isCoolingDown
    ? `${waitingLabel} ${seconds}s`
    : readyLabel;

  const actuallyDisabled = disabled || isCoolingDown;

  return (
    <TouchableOpacity
      activeOpacity={actuallyDisabled ? 1 : 0.7}
      onPress={actuallyDisabled ? undefined : onPress}
      style={[
        styles.btn,
        actuallyDisabled ? styles.btnDisabled : styles.btnReady,
        style,
      ]}
    >
      {spinnerPosition === 'left' && isCoolingDown && <ActivityIndicator style={{ marginRight: 8 }} />}
      <Text style={[styles.text, actuallyDisabled ? styles.textDisabled : styles.textReady, textStyle]}>
        {label}
      </Text>
      {spinnerPosition === 'right' && isCoolingDown && <ActivityIndicator style={{ marginLeft: 8 }} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnReady: { borderColor: '#6FD87A' },
  btnDisabled: { borderColor: '#5a5f6a' },
  text: { fontWeight: '700' },
  textReady: { color: '#6FD87A' },
  textDisabled: { color: '#5a5f6a' },
});

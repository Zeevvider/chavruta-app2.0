import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import axios from 'axios';

// LiveKit client SDK (works in dev build; won’t work inside Expo Go)
import { Room, connect, RoomConnectOptions, RoomOptions } from 'livekit-client';

import VideoTile from './VideoTile';
import ControlsBar from './ControlsBar';
import TextPanel from './TextPanel';
import HelpCard from './HelpCard';
import { C } from '../../../src/styles/theme';

const { width, height } = Dimensions.get('window');
const VIDEO_RADIUS = 24;

// NOTE: for Android Emulator keep 10.0.2.2; for a real device use your machine LAN IP (e.g. http://192.168.1.23:3001/get-token)
const TOKEN_SERVER_URL = 'http://10.0.2.2:3001/get-token';
const LIVEKIT_URL = 'wss://chavruta-x3c3gj8t.livekit.cloud';

export default function RoomScreen() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const roomRef = useRef<Room | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setConnecting(true);
        const res = await axios.post(TOKEN_SERVER_URL, {
          identity: `user-${Math.random().toString(36).slice(2, 8)}`,
          roomName: 'demo-room-1',
        });
        const token: string = res.data?.token;
        if (!token) throw new Error('No token from server');

        const options: RoomOptions = { adaptiveStream: true, dynacast: true };
        const connectOptions: RoomConnectOptions = { autoSubscribe: true };

        const room = await connect(LIVEKIT_URL, token, options, connectOptions);
        roomRef.current = room;

        await room.localParticipant.setMicrophoneEnabled(true);
        await room.localParticipant.setCameraEnabled(true);
        setMicOn(true);
        setCamOn(true);

        room
          .on('participantConnected', (p) => console.log('participantConnected', p.identity))
          .on('participantDisconnected', (p) => console.log('participantDisconnected', p.identity));
      } catch (err: any) {
        console.error('LiveKit connect error', err);
        Alert.alert('LiveKit', err?.message ?? 'Failed to connect');
      } finally {
        setConnecting(false);
      }
    })();

    return () => {
      (async () => {
        try { await roomRef.current?.disconnect(); } catch {}
        roomRef.current = null;
      })();
    };
  }, []);

  const handleToggleMic = async () => {
    const room = roomRef.current; if (!room) return;
    await room.localParticipant.setMicrophoneEnabled(!micOn);
    setMicOn((v) => !v);
  };

  const handleToggleCam = async () => {
    const room = roomRef.current; if (!room) return;
    await room.localParticipant.setCameraEnabled(!camOn);
    setCamOn((v) => !v);
  };

  const handleFlipCam = async () => {
    const room = roomRef.current; if (!room) return;
    await room.localParticipant.setCameraEnabled(false);
    await room.localParticipant.setCameraEnabled(true);
  };

  const handleEndCall = async () => {
    try { await roomRef.current?.disconnect(); } finally { roomRef.current = null; }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.videoArea}>
        <View style={styles.partnerCard}>
          {/* TODO: replace with ParticipantView once you move to a dev build */}
          <VideoTile participant="partner" style={styles.partnerVideo} />
          <View style={styles.partnerOverlay}><Text style={styles.partnerName}>Partner</Text></View>
        </View>

        {camOn && (
          <View style={styles.selfShadow}>
            <VideoTile participant="self" style={styles.selfVideo} small />
          </View>
        )}
      </View>

      <BlurView intensity={40} tint="light" style={styles.controlsWrap}>
        <ControlsBar
          micOn={micOn}
          camOn={camOn}
          onToggleMic={handleToggleMic}
          onToggleCam={handleToggleCam}
          onFlipCam={handleFlipCam}
          onOpenSources={() => setHelpOpen(true)}
          onEndCall={handleEndCall}
        />
      </BlurView>

      {/* Popup card (replaces BottomSheet) */}
      <HelpCard visible={helpOpen} onClose={() => setHelpOpen(false)} title="Learning Text">
        <TextPanel />
      </HelpCard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  videoArea: { flex: 1, margin: 12 },
  partnerCard: {
    flex: 1,
    borderRadius: VIDEO_RADIUS,
    overflow: 'hidden',
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },
  partnerVideo: { flex: 1 },
  partnerOverlay: {
    position: 'absolute',
    top: 10, left: 10,
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.4)',
  },
  partnerName: { color: '#fff', fontWeight: '700' },

  selfShadow: {
    position: 'absolute', right: 16, bottom: 100,
    shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }, elevation: 6,
  },
  selfVideo: {
    width: Math.min(0.28 * width, 140),
    height: 180,
    borderRadius: 16, overflow: 'hidden',
    backgroundColor: C.card, borderWidth: 1, borderColor: C.border,
  },

  controlsWrap: {
    position: 'absolute', left: 12, right: 12, bottom: 12,
    padding: 10, borderRadius: 24, borderWidth: 1, borderColor: C.border,
    overflow: 'hidden',
  },
});

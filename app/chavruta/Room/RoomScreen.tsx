// app/chavruta/Room/RoomScreen.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetHandleProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import axios from 'axios';

import {
  Room,
  RoomConnectOptions,
  RoomOptions,
  Track,
  RemoteParticipant,
} from 'livekit-client';

import ControlsBar from './ControlsBar';
import TextPanel from './TextPanel';
import { C } from '../../../src/styles/theme';

// ---- single definitions (no duplicates) ----
const { width, height } = Dimensions.get('window');
const VIDEO_RADIUS = 24;

// temporary placeholder tile until real video rendering is wired in
const VideoTile = ({ label }: { label: string }) => (
  <View style={[StyleSheet.absoluteFill, styles.center]}>
    <Text style={{ color: C.sub }}>{label}</Text>
  </View>
);

// If you’re on Android emulator, 10.0.2.2 points to your host (localhost).
// On a real device, replace with your laptop’s LAN IP (e.g. http://192.168.1.23:3001/get-token).
const TOKEN_SERVER_URL = 'http://10.0.2.2:3001/get-token';
const LIVEKIT_URL = 'wss://chavruta-x3c3gj8t.livekit.cloud';

export default function RoomScreen() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const [remote, setRemote] = useState<RemoteParticipant | null>(null);
  const [connected, setConnected] = useState(false);

  const roomRef = useRef<Room | null>(null);
  const snapPoints = useMemo(() => ['45%', '85%'], []);

  useEffect(() => {
    (async () => {
      try {
        setConnecting(true);

        // 1) fetch access token
        const res = await axios.post(TOKEN_SERVER_URL, {
          identity: `user-${Math.random().toString(36).slice(2, 8)}`,
          roomName: 'demo-room-1',
        });
        const token = res.data?.token as string | undefined;
        if (!token) throw new Error('No token from server');

        // 2) connect
        const options: RoomOptions = { adaptiveStream: true, dynacast: true };
        const connectOptions: RoomConnectOptions = { autoSubscribe: true };

        const room = new Room(options);
        await room.connect(LIVEKIT_URL, token, connectOptions);
        roomRef.current = room;
        setConnected(true);

        // 3) enable mic/cam
        await room.localParticipant.setMicrophoneEnabled(true);
        await room.localParticipant.setCameraEnabled(true);
        setMicOn(true);
        setCamOn(true);

        // 4) pick first remote participant (for now)
        const pickFirstRemote = () => {
          const iter = room.remoteParticipants.values();
          const first = iter.next().value as RemoteParticipant | undefined;
          setRemote(first ?? null);
        };
        pickFirstRemote();

        room
          .on('participantConnected', pickFirstRemote)
          .on('participantDisconnected', pickFirstRemote)
          .on('trackSubscribed', pickFirstRemote)
          .on('trackUnsubscribed', pickFirstRemote);
      } catch (err: any) {
        console.error('LiveKit connect error', err);
        Alert.alert('LiveKit', err?.message ?? 'Failed to connect');
      } finally {
        setConnecting(false);
      }
    })();

    return () => {
      (async () => {
        try {
          await roomRef.current?.disconnect();
        } catch {}
        roomRef.current = null;
        setConnected(false);
      })();
    };
  }, []);

  // controls
  const handleToggleMic = async () => {
    const room = roomRef.current;
    if (!room) return;
    await room.localParticipant.setMicrophoneEnabled(!micOn);
    setMicOn((v) => !v);
  };

  const handleToggleCam = async () => {
    const room = roomRef.current;
    if (!room) return;
    await room.localParticipant.setCameraEnabled(!camOn);
    setCamOn((v) => !v);
  };

  const handleFlipCam = async () => {
    const room = roomRef.current;
    if (!room) return;
    // simple restart (later: choose deviceId for back/front)
    await room.localParticipant.setCameraEnabled(false);
    await room.localParticipant.setCameraEnabled(true);
  };

  const handleEndCall = async () => {
    try {
      await roomRef.current?.disconnect();
    } finally {
      roomRef.current = null;
      setConnected(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Remote video card */}
      <View style={styles.partnerCard}>
        {connected ? (
          remote ? (
            <VideoTile label={`Remote: ${remote.identity} (camera ${Track.Source.Camera})`} />
          ) : (
            <VideoTile label="Waiting for chavruta to join…" />
          )
        ) : (
          <VideoTile label={connecting ? 'Connecting…' : 'Not connected'} />
        )}
      </View>

      {/* Local self-view PiP (placeholder) */}
      {camOn && connected && (
        <View style={styles.selfShadow}>
          <View style={styles.selfVideo}>
            <View style={[StyleSheet.absoluteFill, styles.center]}>
              <Text style={{ color: C.sub }}>Local (camera)</Text>
            </View>
          </View>
        </View>
      )}

      {/* Controls */}
      <BlurView intensity={40} tint="light" style={styles.controlsWrap}>
        <ControlsBar
          micOn={micOn}
          camOn={camOn}
          onToggleMic={handleToggleMic}
          onToggleCam={handleToggleCam}
          onFlipCam={handleFlipCam}
          onOpenSources={() => {}}
          onEndCall={handleEndCall}
        />
      </BlurView>

      {/* Reading panel */}
      <BottomSheet
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        handleComponent={(props: BottomSheetHandleProps) => (
          <View {...props} style={styles.sheetHandle}>
            <View style={styles.sheetGrabber} />
          </View>
        )}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={1} disappearsOnIndex={-1} />
        )}
        backgroundStyle={styles.sheetBg}
        handleIndicatorStyle={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <TextPanel />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  center: { alignItems: 'center', justifyContent: 'center' },

  partnerCard: {
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: VIDEO_RADIUS,
    overflow: 'hidden',
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    height: height * 0.58,
  },

  selfShadow: {
    position: 'absolute',
    right: 16,
    bottom: 110,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    overflow: 'hidden',
  },
  selfVideo: {
    width: Math.min(0.28 * width, 140),
    height: Math.min(0.38 * height, 190),
    borderRadius: 16,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
  },

  controlsWrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    padding: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: C.border,
  },

  sheetHandle: { alignItems: 'center', paddingVertical: 8 },
  sheetGrabber: {
    width: 46,
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  sheetBg: {
    backgroundColor: C.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: C.border,
  },
});

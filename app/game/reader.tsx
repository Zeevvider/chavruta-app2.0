import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// UI
import ReaderCard from '../../ui/game/ReaderCard';
import { fetchText } from 'others/config/lib/sefaria';

// NEW: typewriter hook (adjust path if you placed it elsewhere)
import { useTypewriter } from 'src/hooks/useTypewriter';

/* ------------------------------- Helpers ------------------------------- */

function parseRef(ref: string) {
  const m = ref.match(/^(.*)\s+(\d+):(\d+)$/);
  if (!m) throw new Error('Bad ref ' + ref);
  return { masechet: m[1], perek: Number(m[2]), mishnah: Number(m[3]) };
}

const masechetKey = (masechetId: string) => `progress:masechet:${masechetId}`;

async function markMishnahDone(masechetId: string, perek: number, mishnah: number) {
  const k = masechetKey(masechetId);
  const raw = await AsyncStorage.getItem(k);
  const map = raw ? (JSON.parse(raw) as Record<string, true>) : {};
  const key = `${perek}:${mishnah}`;
  if (!map[key]) {
    map[key] = true;
    await AsyncStorage.setItem(k, JSON.stringify(map));
  }
}

/* ------------------------------ Data loader --------------------------------- */

async function loadMishnah(ref: string): Promise<{ hebrew: string; translation: string }> {
  const data = await fetchText(ref, 'both');
  const he = Array.isArray(data.he) ? data.he.join(' ') : (data.he ?? '');
  const en = Array.isArray(data.text) ? data.text.join(' ') : (data.text ?? '');
  return { hebrew: he.trim(), translation: en.trim() };
}

/* ---------------------------- Reader component ------------------------------ */

export default function ReaderSingle() {
  const router = useRouter();
  const {
    ref = '',
    id = '',
    title,
    mode = 'single',
    nextRef,
  } = useLocalSearchParams<{ ref?: string; id?: string; title?: string; mode?: string; nextRef?: string }>();

  const [fullText, setFullText] = useState('');
  const [translation, setTranslation] = useState('');
  const [showTrans, setShowTrans] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [showHelp, setShowHelp] = useState(false);

  // Derive labels
  const parsed = useMemo(() => (ref ? parseRef(String(ref)) : null), [ref]);
  const headerTitle = title ?? parsed?.masechet ?? String(ref);

  // Load text
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { hebrew, translation } = await loadMishnah(String(ref));
      if (!mounted) return;
      setFullText(hebrew);
      setTranslation(translation);
    })();
    return () => { mounted = false; };
  }, [ref]);

  // Typewriter instances
  const twHe = useTypewriter(fullText, { cps: 28, delayMs: 150 });
  const twEn = useTypewriter(showTrans ? translation : '', { cps: 32, delayMs: 100 });

  // Restart translation typing when toggled on
  useEffect(() => {
    if (showTrans && translation) twEn.restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTrans]);

  const hint = useMemo(() => makeHint(fullText), [fullText]);

  const onNext = async () => {
    if (parsed && id) await markMishnahDone(String(id), parsed.perek, parsed.mishnah);
    const nxt = nextRef ? String(nextRef) : null;
    if (!nxt) { router.back(); return; }
    router.replace({ pathname: '/game/reader', params: { ref: nxt, id, title, mode: 'single' } });
  };

  const onMarkChavruta = async () => {
    if (parsed && id) await markMishnahDone(String(id), parsed.perek, parsed.mishnah);
  };

  return (
    <SafeAreaView style={s.root}>
      {/* Top bar */}
      <View style={s.topBar}>
        <Pressable hitSlop={10} onPress={() => router.back()} style={s.iconBtn}>
          <Ionicons name="chevron-back" size={22} color="#2a231b" />
        </Pressable>

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={s.title}>{headerTitle}</Text>
          {!!parsed && (<Text style={s.subtitle}>Perek {parsed.perek} • Mishnah {parsed.mishnah}</Text>)}
        </View>

        {/* Skip typing */}
        <Pressable onPress={() => twHe.skip()} style={[s.iconBtn, s.iconBtnActive]}>
          <Text style={{ fontWeight: '800', color: '#2a231b' }}>Skip</Text>
        </Pressable>

        {/* Toggle translation */}
        <Pressable
          accessibilityLabel="Toggle translation"
          onPress={() => setShowTrans(v => !v)}
          style={[s.iconBtn, showTrans && s.iconBtnActive]}
        >
          <Ionicons name="language" size={18} color={showTrans ? '#2a231b' : '#7b6e63'} />
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <ReaderCard
          text={twHe.done ? twHe.text : `${twHe.text}▍`} // add a subtle cursor
          fontScale={fontScale}
          onFontIncrease={() => setFontScale(v => Math.min(1.4, v + 0.1))}
          onFontDecrease={() => setFontScale(v => Math.max(0.8, v - 0.1))}
          onHelp={() => setShowHelp(true)}
          onMarkChavruta={onMarkChavruta}
        />

        {/* Typing controls */}
        {!twHe.done && (
          <View style={ctrl.row}>
            <Pressable onPress={() => twHe.setPaused(!twHe.paused)} style={ctrl.btn}>
              <Text style={ctrl.btnTxt}>{twHe.paused ? '▶︎ Resume' : '⏸ Pause'}</Text>
            </Pressable>
            <Pressable onPress={() => twHe.setSpeed(28)} style={ctrl.btnSmall}><Text style={ctrl.btnTxt}>1x</Text></Pressable>
            <Pressable onPress={() => twHe.setSpeed(50)} style={ctrl.btnSmall}><Text style={ctrl.btnTxt}>2x</Text></Pressable>
            <Pressable onPress={() => twHe.skip()} style={ctrl.btn}><Text style={ctrl.btnTxt}>Skip</Text></Pressable>
          </View>
        )}

        {/* Translation (also typed) */}
        {showTrans && (
          <View style={[s.card, s.cardSecondary]}>
            <Text style={s.trans}>{twEn.text}</Text>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky Next button */}
      {mode === 'single' && (
        <View style={s.nextWrap}>
          <Pressable style={s.nextBtn} onPress={onNext}>
            <Text style={s.nextTxt}>Next Mishnah</Text>
            <Ionicons name="chevron-forward" size={20} color="#2a231b" />
          </Pressable>
        </View>
      )}

      {/* Help modal */}
      <Modal visible={showHelp} transparent animationType="fade" onRequestClose={() => setShowHelp(false)}>
        <Pressable style={s.scrim} onPress={() => setShowHelp(false)}>
          <View style={s.sheet}>
            <Text style={s.sheetTitle}>Quick idea</Text>
            <Text style={s.sheetText}>{hint}</Text>
            <Pressable onPress={() => setShowHelp(false)} style={s.sheetBtn}>
              <Text style={{ fontWeight: '800' }}>Got it</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

/* ------------------------------ helpers ------------------------------ */
function makeHint(text: string): string {
  if (!text) return '';
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length > 160 ? t.slice(0, 157) + '…' : t;
}

/* ------------------------------- styles ------------------------------- */
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFF9F2' },

  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 4, paddingBottom: 6 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginLeft: 6 },
  iconBtnActive: { backgroundColor: '#F3EFE8' },
  title: { textAlign: 'center', fontWeight: '800', color: '#2a231b' },
  subtitle: { textAlign: 'center', color: '#6f655b', fontSize: 12, marginTop: 2 },

  content: { paddingHorizontal: 16, paddingTop: 8 },

  card: {
    borderRadius: 22,
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EFE7DE',
  },
  cardSecondary: { marginTop: 12, backgroundColor: '#FFFCF7' },
  trans: { textAlign: 'left', color: '#3e372f', lineHeight: 22 },

  nextWrap: { position: 'absolute', left: 0, right: 0, bottom: 12, paddingHorizontal: 16 },
  nextBtn: { backgroundColor: '#FFD37A', borderRadius: 26, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 4, gap: 6 },
  nextTxt: { fontWeight: '800', color: '#2a231b' },

  scrim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  sheetTitle: { fontWeight: '800', fontSize: 16, marginBottom: 8 },
  sheetText: { fontSize: 14, lineHeight: 20, color: '#444' },
  sheetBtn: { alignSelf: 'center', marginTop: 12, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFD37A', borderRadius: 20 },
});

const ctrl = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginTop: 8, alignSelf: 'center' },
  btn: { backgroundColor: '#FFE083', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 16 },
  btnSmall: { backgroundColor: '#F3EFE8', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 16 },
  btnTxt: { fontWeight: '800', color: '#2a231b' },
});

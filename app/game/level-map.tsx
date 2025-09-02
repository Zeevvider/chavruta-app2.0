import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMishnahChapters } from "others/config/lib/sefaria";

/* ----------------------------- Types ----------------------------- */
type ProgressMap = Record<string, boolean>;       // "perek:mishnah" -> true/false
type Chapter = { title: string; count: number };  // e.g., {title:"Perek 1", count:18}

/* -------------------------- Storage helpers ---------------------- */
const progKey = (masechetId: string) => `progress:masechet:${masechetId}`;

/* ----------------------- Structure fetching ---------------------- */
async function getChaptersFor(ref: string): Promise<Chapter[]> {
  return getMishnahChapters(ref); // no meta.index usage
}

/* ------------------------------ Screen --------------------------- */
export default function LevelMapScreen() {
  const router = useRouter();
  const { id = "avot", title = "Pirkei Avot", ref = "Mishnah Avot" } =
    useLocalSearchParams<{ id?: string; title?: string; ref?: string }>();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [done, setDone] = useState<ProgressMap>({}); // "perek:mishnah" -> true

  // load structure + progress
  useEffect(() => {
    (async () => {
      const ch = await getChaptersFor(ref);
      setChapters(ch);
      const raw = await AsyncStorage.getItem(progKey(id));
      setDone(raw ? (JSON.parse(raw) as ProgressMap) : {});
    })();
  }, [id, ref]);

  const total = useMemo(() => chapters.reduce((a, c) => a + c.count, 0), [chapters]);
  const completed = useMemo(() => Object.keys(done).length, [done]);
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const saveDone = useCallback(
    async (next: ProgressMap) => {
      setDone(next);
      await AsyncStorage.setItem(progKey(id), JSON.stringify(next));
    },
    [id]
  );

  const markDone = useCallback(
    (perek: number, mishnah: number) => {
      const k = `${perek}:${mishnah}`;
      if (done[k]) return;
      const next = { ...done, [k]: true };
      saveDone(next);
    },
    [done, saveDone]
  );

  // find next unfinished (for Continue)
  const nextRef = useMemo(() => {
    for (let p = 1; p <= chapters.length; p++) {
      for (let m = 1; m <= chapters[p - 1].count; m++) {
        if (!done[`${p}:${m}`]) return `${ref} ${p}:${m}`;
      }
    }
    return `${ref} 1:1`;
  }, [chapters, done, ref]);

  const openLevel = (perek: number, mishnah: number) => {
    router.push({
      pathname: "/game/reader",
      params: {
        ref: `${ref} ${perek}:${mishnah}`,
        id,                // pass masechet id for progress map
        title,             // display name for header
        mode: "single",
        nextRef,           // for fast “Next”
      },
    });
  };

  return (
    <ScrollView style={s.container} contentInsetAdjustmentBehavior="automatic">
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.meta}>
          {completed}/{total} • {pct}% complete
        </Text>
        <Pressable
          style={s.cta}
          onPress={() =>
            router.push({
              pathname: "/game/reader",
              params: { ref: nextRef, id, title, mode: "single", nextRef },
            })
          }
        >
          <Text style={s.ctaTxt}>Continue</Text>
        </Pressable>
      </View>

      {/* Chapters → Level grid */}
      {chapters.map((ch, i) => {
        const perek = i + 1;
        const doneInPerek = Array.from({ length: ch.count }).filter((_, m) => done[`${perek}:${m + 1}`]).length;
        return (
          <View key={perek} style={s.section}>
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>{ch.title}</Text>
              <Text style={s.sectionSub}>
                {doneInPerek}/{ch.count}
              </Text>
            </View>

            <View style={s.grid}>
              {Array.from({ length: ch.count }, (_, m) => {
                const mishnah = m + 1;
                const isDone = !!done[`${perek}:${mishnah}`];
                return (
                  <Pressable
                    key={`${perek}:${mishnah}`}
                    style={[s.level, isDone && s.levelDone]}
                    onPress={() => openLevel(perek, mishnah)}
                    onLongPress={() => markDone(perek, mishnah)}
                  >
                    <Text style={s.levelTxt}>{mishnah}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}

      <View style={{ height: 40 }} />
      <Text style={s.hint}>Tip: long-press a circle to mark ⭐ and unlock the next.</Text>
      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

/* ------------------------------ Styles --------------------------- */
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0b" },

  header: { padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#242424" },
  title: { color: "#fff", fontSize: 22, fontWeight: "800" },
  meta: { color: "#bfbfbf", marginTop: 6 },
  cta: { marginTop: 10, backgroundColor: "#e11d48", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, alignSelf: "flex-start" },
  ctaTxt: { color: "#fff", fontWeight: "700" },

  section: { paddingHorizontal: 14, paddingTop: 14 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  sectionTitle: { color: "#fff", fontWeight: "700", fontSize: 16 },
  sectionSub: { color: "#9a9a9a", fontWeight: "600" },

  grid: { flexDirection: "row", flexWrap: "wrap" },
  level: {
    width: 48, height: 48, borderRadius: 24,
    marginRight: 10, marginBottom: 10,
    backgroundColor: "#1a1a1a", alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "#2a2a2a",
  },
  levelDone: { backgroundColor: "#1f3d20", borderColor: "#2d5b30" },
  levelTxt: { color: "#fff", fontWeight: "800" },

  hint: { textAlign: "center", color: "#8a8a8a" },
});

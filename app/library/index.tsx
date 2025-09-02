// app/library/index.tsx
import React, { useMemo, useState, useCallback } from "react";
import {
  View, Text, StyleSheet, ScrollView, FlatList, Pressable, Image, SafeAreaView, StatusBar
} from "react-native";
import { useRouter } from "expo-router";

type Card = { id: string; title: string; cover: string; ref: string; tags: string[] };
type Row = { heading: string; items: Card[] };

const ALL_TAGS = ["All","Beginner","Halacha","Aggadah","Popular","Short Sessions","Shabbat","Berakhot","Moed","Nashim"];

const ROWS: Row[] = [
  { heading: "Popular Now",
    items: [
      { id:"berakhot", title:"Berakhot", ref:"Mishnah Berakhot", tags:["Popular","Beginner","Berakhot"], cover:"https://placehold.co/360x540/png" },
      { id:"shabbat",  title:"Shabbat",  ref:"Mishnah Shabbat",  tags:["Popular","Shabbat","Moed"],     cover:"https://placehold.co/360x540/png" },
      { id:"taanit",   title:"Taanit",   ref:"Mishnah Taanit",   tags:["Moed"],                          cover:"https://placehold.co/360x540/png" },
    ]},
  { heading: "For Beginners",
    items: [
      { id:"avot",   title:"Avot",   ref:"Mishnah Avot",   tags:["Beginner","Aggadah"], cover:"https://placehold.co/360x540/png" },
      // Kitzur card → goes to /library/kitzur topics
      { id:"kitzur", title:"Kitzur Shulchan Arukh", ref:"Kitzur Shulchan Arukh", tags:["Beginner","Halacha"], cover:"https://placehold.co/360x540/png" },
    ]},
  { heading: "Halacha Tracks",
    items: [
      { id:"pesachim", title:"Pesachim", ref:"Mishnah Pesachim", tags:["Halacha","Moed"], cover:"https://placehold.co/360x540/png" },
      { id:"sukkah",   title:"Sukkah",   ref:"Mishnah Sukkah",   tags:["Halacha","Moed"], cover:"https://placehold.co/360x540/png" },
    ]},
];

// layout constants
const CARD_W = 130;
const CARD_H = 180;
const CARD_GAP = 10;
const SNAP = CARD_W + CARD_GAP;

export default function Library() {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState<string>("All");

  const filteredRows = useMemo(() => {
    if (activeTag === "All") return ROWS;
    return ROWS.map(r => ({ ...r, items: r.items.filter(it => it.tags.includes(activeTag)) }))
               .filter(r => r.items.length > 0);
  }, [activeTag]);

  const handlePress = useCallback((item: Card) => {
    if (item.id === "kitzur") {
      // Go to the Kitzur topics grid
      router.push("/library/kitzur");
    } else {
      // Default: open the Level Map screen
      router.push({
        pathname: "/game/level-map",
        params: { id: item.id, title: item.title, ref: item.ref },
      });
    }
  }, [router]);

  const renderCard = useCallback(({ item }: { item: Card }) => (
    <Pressable style={s.card} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.cover }} style={s.poster} />
      {/* presence badge (hook up later) */}
      <View style={s.badge}>
        <View style={s.dot} />
        <Text style={s.badgeTxt}>12 studying</Text>
      </View>
      <Text numberOfLines={1} style={s.cardTitle}>{item.title}</Text>
    </Pressable>
  ), [handlePress]);

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={s.container} contentInsetAdjustmentBehavior="automatic">
        {/* FILTER CHIPS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipsRow}>
          {ALL_TAGS.map(tag => {
            const active = activeTag === tag;
            return (
              <Pressable key={tag} onPress={() => setActiveTag(tag)} style={[s.chip, active && s.chipActive]}>
                <Text style={[s.chipText, active && s.chipTextActive]}>{tag}</Text>
                <Text style={[s.plus, active && s.plusActive]}>＋</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* CAROUSEL ROWS */}
        {filteredRows.map((row, i) => (
          <View key={i} style={s.section}>
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>{row.heading}</Text>
              <Pressable hitSlop={8}><Text style={s.seeAll}>See all ›</Text></Pressable>
            </View>

            <FlatList
              horizontal
              data={row.items}
              keyExtractor={(it) => it.id}
              renderItem={renderCard}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              decelerationRate="fast"
              snapToAlignment="start"
              snapToInterval={SNAP}
              getItemLayout={(_, index) => ({ length: SNAP, offset: SNAP * index, index })}
            />
          </View>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ----------------------------- Styles ----------------------------- */
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b0b0b" },
  container: { flex: 1, backgroundColor: "#0b0b0b" },

  chipsRow: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 4 },
  chip: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 20, borderWidth: 1, borderColor: "#2a2a2a",
    marginRight: 8, backgroundColor: "#121212"
  },
  chipActive: { backgroundColor: "#ffffff", borderColor: "#ffffff" },
  chipText: { color: "#e8e8e8", fontWeight: "600" },
  chipTextActive: { color: "#0b0b0b" },
  plus: { marginLeft: 8, color: "#9a9a9a", fontSize: 14, fontWeight: "700" },
  plusActive: { color: "#0b0b0b" },

  section: { marginTop: 12 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, marginBottom: 8 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  seeAll: { color: "#bdbdbd", fontWeight: "600" },

  card: { width: CARD_W, marginRight: CARD_GAP },
  poster: { width: CARD_W, height: CARD_H, borderRadius: 12, backgroundColor: "#202020" },
  cardTitle: { color: "#fff", marginTop: 6, fontWeight: "700" },

  // presence badge
  badge:{ position:"absolute", left:8, bottom:8, paddingHorizontal:8, paddingVertical:4, borderRadius:12, backgroundColor:"rgba(0,0,0,0.55)", flexDirection:"row", alignItems:"center" },
  dot:{ width:6, height:6, borderRadius:3, backgroundColor:"#22c55e", marginRight:6 },
  badgeTxt:{ color:"#fff", fontSize:12, fontWeight:"700" },
});

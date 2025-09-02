import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { getKitzurSimanCounts } from "others/config/lib/sefaria";

// Tweak these ranges later with your final taxonomy
const TOPICS = [
  { id: "daily",   title: "Daily Life",     range: [1, 20] },
  { id: "berakhot",title: "Berachot",       range: [41, 66] },
  { id: "shabbat", title: "Shabbat",        range: [72, 97] },
  { id: "yomtov",  title: "Yamim Tovim",    range: [98, 118] },
  { id: "pesach",  title: "Pesach",         range: [115, 120] },
  { id: "moadim",  title: "Other Moed",     range: [121, 150] },
  { id: "benadam", title: "Ben Adam Lech.", range: [151, 182] },
];

export default function KitzurTopics() {
  const router = useRouter();
  const [counts, setCounts] = useState<number[] | null>(null);

  useEffect(() => { (async () => setCounts(await getKitzurSimanCounts()))(); }, []);

  return (
    <ScrollView style={s.container} contentInsetAdjustmentBehavior="automatic">
      <Text style={s.title}>Kitzur Shulchan Aruch</Text>
      <Text style={s.sub}>Choose a topic to begin</Text>

      <View style={s.grid}>
        {TOPICS.map(t => {
          const totalSeifim = counts
            ? counts.slice(t.range[0]-1, t.range[1]).reduce((a,b)=>a+b,0)
            : undefined;

          return (
            <Pressable
              key={t.id}
              style={s.card}
              onPress={() =>
                router.push({
                  pathname: "/game/level-map",
                  params: {
                    id: "kitzur",
                    title: `Kitzur • ${t.title}`,
                    ref: "Kitzur Shulchan Arukh",
                    rStart: String(t.range[0]),
                    rEnd: String(t.range[1]),
                  },
                })
              }
            >
              <Text style={s.cardTitle}>{t.title}</Text>
              <Text style={s.cardMeta}>
                סימנים {t.range[0]}–{t.range[1]}
                {typeof totalSeifim === "number" ? ` • ${totalSeifim} סעיפים` : ""}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{height:24}} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#0b0b0b", paddingHorizontal:14, paddingTop:14 },
  title:{ color:"#fff", fontSize:22, fontWeight:"800" },
  sub:{ color:"#bdbdbd", marginTop:6, marginBottom:12 },
  grid:{ flexDirection:"row", flexWrap:"wrap", gap:10 },
  card:{ width:"48%", backgroundColor:"#171717", borderRadius:14, padding:14, borderWidth:1, borderColor:"#262626" },
  cardTitle:{ color:"#fff", fontWeight:"800", marginBottom:6 },
  cardMeta:{ color:"#9a9a9a" },
});

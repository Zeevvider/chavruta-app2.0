// app/library/index.tsx
import React, { useMemo, useState, useCallback } from "react";
import {
  View, StyleSheet, ScrollView, SafeAreaView, StatusBar
} from "react-native";
import { useRouter } from "expo-router";

// New centralized components
import { FilterRow, LibrarySection } from "../../src/components/library";
import { colors } from "../../src/styles/design-system";

type LibraryItem = { id: string; title: string; cover: string; ref: string; tags: string[]; studyingCount?: number };
type LibrarySectionData = { heading: string; items: LibraryItem[] };

const ALL_TAGS = [
  { label: "All", value: "all" },
  { label: "Beginner", value: "beginner" },
  { label: "Halacha", value: "halacha" },
  { label: "Aggadah", value: "aggadah" },
  { label: "Popular", value: "popular" },
  { label: "Short Sessions", value: "short" },
  { label: "Shabbat", value: "shabbat" },
  { label: "Berakhot", value: "berakhot" },
  { label: "Moed", value: "moed" },
  { label: "Nashim", value: "nashim" },
];

const SECTIONS: LibrarySectionData[] = [
  { 
    heading: "Popular Now",
    items: [
      { id:"berakhot", title:"Berakhot", ref:"Mishnah Berakhot", tags:["popular","beginner","berakhot"], cover:"https://placehold.co/360x540/png", studyingCount: 12 },
      { id:"shabbat",  title:"Shabbat",  ref:"Mishnah Shabbat",  tags:["popular","shabbat","moed"],     cover:"https://placehold.co/360x540/png", studyingCount: 8 },
      { id:"taanit",   title:"Taanit",   ref:"Mishnah Taanit",   tags:["moed"],                          cover:"https://placehold.co/360x540/png", studyingCount: 5 },
      { id:"gemara", title:"Gemara", ref:"Gemara Bavli", tags:["popular"], cover:"https://placehold.co/360x540/png", studyingCount: 15 },
    ]
  },
  { 
    heading: "For Beginners",
    items: [
      { id:"avot",   title:"Avot",   ref:"Mishnah Avot",   tags:["beginner","aggadah"], cover:"https://placehold.co/360x540/png", studyingCount: 20 },
      { id:"kitzur", title:"Kitzur Shulchan Arukh", ref:"Kitzur Shulchan Arukh", tags:["beginner","halacha"], cover:"https://placehold.co/360x540/png", studyingCount: 7 },
    ]
  },
  { 
    heading: "Halacha Tracks",
    items: [
      { id:"pesachim", title:"Pesachim", ref:"Mishnah Pesachim", tags:["halacha","moed"], cover:"https://placehold.co/360x540/png", studyingCount: 3 },
      { id:"sukkah",   title:"Sukkah",   ref:"Mishnah Sukkah",   tags:["halacha","moed"], cover:"https://placehold.co/360x540/png", studyingCount: 6 },
    ]
  },
];

export default function Library() {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredSections = useMemo(() => {
    if (activeTag === "all") return SECTIONS;
    return SECTIONS.map(section => ({ 
      ...section, 
      items: section.items.filter(item => item.tags.includes(activeTag)) 
    })).filter(section => section.items.length > 0);
  }, [activeTag]);

  const handleItemPress = useCallback((item: LibraryItem) => {
    if (item.id === "kitzur") {
      router.push("/library/kitzur");
    } else if (item.id === "gemara") {
      router.push("/library/GemaraReader");
    } else {
      router.push({
        pathname: "/game/level-map",
        params: { id: item.id, title: item.title, ref: item.ref },
      });
    }
  }, [router]);

  const handleSeeAllPress = useCallback((sectionTitle: string) => {
    // TODO: Navigate to full section view
    console.log(`See all ${sectionTitle}`);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
        <FilterRow
          filters={ALL_TAGS}
          activeFilter={activeTag}
          onFilterChange={setActiveTag}
        />

        {filteredSections.map((section, index) => (
          <LibrarySection
            key={index}
            title={section.heading}
            items={section.items}
            onItemPress={handleItemPress}
            onSeeAllPress={() => handleSeeAllPress(section.heading)}
            testID={`section-${index}`}
          />
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: colors.neutral[950] 
  },
  container: { 
    flex: 1, 
    backgroundColor: colors.neutral[950] 
  },
});

// app/gemara/GemaraReader.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

type Mode = "rashi" | "tosafot" | "explanation";

// helper to strip HTML tags
const stripHTML = (input: string): string =>
  input ? input.replace(/<[^>]+>/g, "").trim() : "";

export default function GemaraReader() {
  const [loading, setLoading] = useState(true);
  const [gemaraText, setGemaraText] = useState<string[]>([]);
  const [rashiMap, setRashiMap] = useState<Record<string, string>>({});
  const [tosafotMap, setTosafotMap] = useState<Record<string, string>>({});
  const [popup, setPopup] = useState<{ word: string; text: string } | null>(
    null
  );
  const [mode, setMode] = useState<Mode>("rashi");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://www.sefaria.org/api/texts/Berakhot.2a?lang=he&commentary=1";
        const gemaraRes = await axios.get(url);

        const baseText: string[] = gemaraRes.data?.he || [];

        const rashiMap: Record<string, string> = {};
        const tosafotMap: Record<string, string> = {};

        if (Array.isArray(gemaraRes.data?.commentary)) {
          gemaraRes.data.commentary.forEach((c: any) => {
            const title = c?.collectiveTitle?.en;
            const anchor = stripHTML(c?.anchorText || "");
            const firstComment =
              Array.isArray(c?.commentary) && c.commentary.length > 0
                ? c.commentary[0]
                : null;

            if (!anchor || !firstComment) return;

            const text = stripHTML(firstComment.he || firstComment.text || "");
            if (!text) return;

            if (title === "Rashi") {
              rashiMap[anchor] = text;
            } else if (title === "Tosafot") {
              tosafotMap[anchor] = text;
            }
          });
        }

        setGemaraText(baseText.map(stripHTML));
        setRashiMap(rashiMap);
        setTosafotMap(tosafotMap);
        setLoading(false);
      } catch (e: any) {
        console.error("❌ Error fetching Sefaria", e?.message || e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCurrentMap = (): Record<string, string> => {
    if (mode === "rashi") return rashiMap;
    if (mode === "tosafot") return tosafotMap;
    return {}; // explanation can be your own DB later
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.root}>
        <ActivityIndicator size="large" color="#6C91BF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* Toolbar toggle */}
      <View style={styles.toolbar}>
        <Pressable
          style={[styles.button, mode === "rashi" && styles.active]}
          onPress={() => setMode("rashi")}
        >
          <Text style={styles.buttonText}>📜 Rashi</Text>
        </Pressable>
        <Pressable
          style={[styles.button, mode === "tosafot" && styles.active]}
          onPress={() => setMode("tosafot")}
        >
          <Text style={styles.buttonText}>📖 Tosafot</Text>
        </Pressable>
        <Pressable
          style={[styles.button, mode === "explanation" && styles.active]}
          onPress={() => setMode("explanation")}
        >
          <Text style={styles.buttonText}>💡 Explanation</Text>
        </Pressable>
      </View>

      {/* Gemara text */}
      <View style={styles.textContainer}>
        {gemaraText.map((segment, idx) => {
          const currentMap = getCurrentMap();
          const hasCommentary = Object.keys(currentMap).some((anchor) =>
            segment.includes(anchor)
          );

          return (
            <Pressable
              key={idx}
              onPress={() => {
                const anchor = Object.keys(currentMap).find((a) =>
                  segment.includes(a)
                );
                if (anchor) {
                  setPopup({ word: anchor, text: currentMap[anchor] });
                }
              }}
            >
              <Text style={[styles.word, hasCommentary && styles.bold]}>
                {segment + " "}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Popup modal */}
      <Modal transparent visible={!!popup} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setPopup(null)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{popup?.word}</Text>
            <Text>{popup?.text}</Text>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F7EBDD" },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  active: { backgroundColor: "#8FB996" },
  buttonText: { fontSize: 16, color: "#fff" },
  textContainer: {
    flexWrap: "wrap",
    flexDirection: "row-reverse", // Hebrew direction
    padding: 16,
  },
  word: { fontSize: 20, lineHeight: 32, color: "#1E1E1E" },
  bold: { fontWeight: "700", color: "#6C91BF" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    maxWidth: "80%",
  },
  modalTitle: { fontWeight: "700", fontSize: 18, marginBottom: 8 },
});

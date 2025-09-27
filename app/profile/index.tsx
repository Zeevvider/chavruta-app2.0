// app/profile/index.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#ADC2A5", "#F7EBDD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/200" }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>Shalom Zeev 👋</Text>
          <Text style={styles.subtitle}>🔥 12-day streak</Text>
        </View>
        <Pressable onPress={() => router.push("/profile/edit")}>
          <Ionicons name="pencil" size={22} color="#1E1E1E" />
        </Pressable>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsRow}>
        <View style={styles.card}>
          <Ionicons name="flame" size={26} color="#FF6B35" />
          <Text style={styles.cardNumber}>12</Text>
          <Text style={styles.cardLabel}>Streak</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="star" size={26} color="#FFD93D" />
          <Text style={styles.cardNumber}>250</Text>
          <Text style={styles.cardLabel}>Coins</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="book" size={26} color="#6A4C93" />
          <Text style={styles.cardNumber}>34</Text>
          <Text style={styles.cardLabel}>Chapters</Text>
        </View>
      </View>

      {/* Action Cards */}
      <View style={styles.section}>
        <Pressable style={[styles.actionCard, { backgroundColor: "#C0EBA6" }]}>
          <Ionicons name="people" size={22} color="#1E1E1E" />
          <Text style={styles.actionText}>Find a Chavruta</Text>
        </Pressable>

        <Pressable style={[styles.actionCard, { backgroundColor: "#FFD6A5" }]}>
          <Ionicons name="library" size={22} color="#1E1E1E" />
          <Text style={styles.actionText}>Learning History</Text>
        </Pressable>

        <Pressable style={[styles.actionCard, { backgroundColor: "#A0C4FF" }]}>
          <Ionicons name="language" size={22} color="#1E1E1E" />
          <Text style={styles.actionText}>Change Languages</Text>
        </Pressable>

        {/* ✅ New Settings Button */}
        <Pressable
          style={[styles.actionCard, { backgroundColor: "#E2E2E2" }]}
          onPress={() => router.push("/settings/SettingsScreen")}
        >
          <Ionicons name="settings-outline" size={22} color="#1E1E1E" />
          <Text style={styles.actionText}>Settings</Text>
        </Pressable>
      </View>

      {/* Toggle */}
      <View style={styles.section}>
        <View style={[styles.actionCard, { backgroundColor: "#E2E2E2" }]}>
          <Ionicons name="moon" size={22} color="#333" />
          <Text style={styles.actionText}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.section}>
        <Pressable style={[styles.actionCard, { backgroundColor: "#FFADAD" }]}>
          <Ionicons name="log-out" size={22} color="#fff" />
          <Text style={[styles.actionText, { color: "#fff" }]}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 12 },
  headerText: { flex: 1 },
  name: { fontSize: 22, fontWeight: "700", color: "#1E1E1E" },
  subtitle: { fontSize: 15, color: "#333" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    width: 100,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardNumber: { fontSize: 20, fontWeight: "700", marginTop: 6 },
  cardLabel: { fontSize: 13, color: "#666" },

  section: { marginBottom: 20, paddingHorizontal: 16 },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  actionText: { fontSize: 16, fontWeight: "600", marginLeft: 10 },
});

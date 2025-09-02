// app/chavruta/room/TextPanel.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { C } from 'src/styles/theme';

export default function TextPanel() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📖 Learning Text</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.paragraph}>
          אמר רבי עקיבא: ואהבת לרעך כמוך — זה כלל גדול בתורה.
        </Text>

        <Text style={styles.paragraph}>
          R. Akiva said: "Love your fellow as yourself" — this is a great principle of the Torah.
        </Text>

        <Text style={styles.paragraph}>
          This passage teaches us the foundation of interpersonal mitzvot. 
          Many commentaries expand on the idea that respecting others leads to deeper Torah study.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: C.sub,
    marginBottom: 14,
  },
});

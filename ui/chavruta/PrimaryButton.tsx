import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from 'src/styles/theme';


const C = {
brand: colors?.accent || '#7acb8a',
};


const styles = StyleSheet.create({
primaryBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, backgroundColor: C.brand },
primaryBtnText: { color: '#0b110f', fontWeight: '800' },
});


export default function PrimaryButton({ label, onPress, icon }: { label: string; onPress: () => void; icon?: any }) {
return (
<Pressable onPress={onPress} style={styles.primaryBtn}>
{icon && <Ionicons name={icon} size={18} style={{ marginRight: 8 }} />}
<Text style={styles.primaryBtnText}>{label}</Text>
</Pressable>
);
}
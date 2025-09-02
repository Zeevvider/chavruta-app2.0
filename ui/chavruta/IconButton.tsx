import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function IconButton({ icon, onPress }: { icon: any; onPress: () => void }) {
return (
<Pressable onPress={onPress} style={{ padding: 8, borderRadius: 12, backgroundColor: '#a8aebaff' }}>
<Ionicons name={icon} size={20} />
</Pressable>
);
}
// app/calendar/CalendarScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
} from 'react-native';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';

// Dummy events
const initialEvents = [
  {
    id: '1',
    title: 'Choshen Mishpat 180',
    start: new Date(2025, 8, 18, 9, 0),
    end: new Date(2025, 8, 18, 10, 0),
  },
  {
    id: '2',
    title: 'חזרה אתמול – סוגיות קניין',
    start: new Date(2025, 8, 17, 11, 0),
    end: new Date(2025, 8, 17, 12, 0),
  },
];

export default function CalendarScreen() {
  const [events, setEvents] = useState(initialEvents);

  // Group events by day
  const grouped = events.reduce((acc, e) => {
    const day = dayjs(e.start).format('YYYY-MM-DD');
    if (!acc[day]) acc[day] = [];
    acc[day].push(e);
    return acc;
  }, {} as Record<string, typeof initialEvents>);

  // Current week
  const startOfWeek = dayjs().startOf('week');
  const days = Array.from({ length: 7 }).map((_, i) =>
    startOfWeek.add(i, 'day')
  );

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.navBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>{startOfWeek.format('MMM YYYY')}</Text>
        <Pressable style={styles.navBtn}>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </Pressable>
      </View>

      {/* Calendar days */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {days.map((day) => {
          const key = day.format('YYYY-MM-DD');
          const dayEvents = grouped[key] || [];

          return (
            <View key={key} style={styles.dayBlock}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayLabel}>{day.format('ddd')}</Text>
                <Text
                  style={[
                    styles.dayNum,
                    day.isSame(dayjs(), 'day') && styles.todayNum,
                  ]}
                >
                  {day.format('D')}
                </Text>
              </View>

              {dayEvents.length === 0 && (
                <Pressable
                  style={styles.addSlot}
                  onPress={() => {
                    const newEvent = {
                      id: Math.random().toString(36).slice(2),
                      title: 'New chavruta slot',
                      start: day.hour(10).toDate(),
                      end: day.hour(11).toDate(),
                    };
                    setEvents((prev) => [...prev, newEvent]);
                  }}
                >
                  <Ionicons name="add-circle" size={18} color="#4CAF50" />
                  <Text style={styles.addText}> Add chavruta slot</Text>
                </Pressable>
              )}

              {dayEvents.map((e) => (
                <Pressable
                  key={e.id}
                  style={styles.session}
                  onPress={() => console.log('Tapped event:', e)}
                >
                  <Text style={styles.sessionTime}>
                    {dayjs(e.start).format('HH:mm')} – {dayjs(e.end).format('HH:mm')}
                  </Text>
                  <Text style={styles.sessionTitle}>{e.title}</Text>
                </Pressable>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFDF7' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  navBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#333',
  },

  dayBlock: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayLabel: { fontWeight: '600', fontSize: 15, color: '#444' },
  dayNum: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#999',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  todayNum: {
    backgroundColor: '#FFD54F',
    color: '#000',
  },

  addSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FAFAFA',
    marginBottom: 8,
  },
  addText: { color: '#4CAF50', fontWeight: '500', fontSize: 14 },

  session: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  sessionTime: { fontSize: 12, color: '#555', marginBottom: 4 },
  sessionTitle: { fontWeight: '600', fontSize: 14, color: '#0D47A1' },
});

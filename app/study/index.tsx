import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

// Update the import path to the correct relative location of CooldownButton
import CooldownButton from '../../others/config/components/CooldownButton';
// Update the import path to the correct relative location of fetchText
import { fetchText } from '../../others/config/lib/sefaria';
import { colors, spacing, typography } from '../../src/styles/theme';

export default function Study() {
  const [ref, setRef] = useState('Mishnah Avot 1');
  const qc = useQueryClient();
  const router = useRouter();

  // current chapter
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['text', ref],
    queryFn: () => fetchText(ref, 'he'),
    staleTime: 60_000,
  });

  const lines = useMemo(() => data?.he ?? [], [data]);

  // probe next
  const nextRef = useMemo(() => nextChapter(ref), [ref]);
  const { data: probe, isFetching: probing } = useQuery({
    queryKey: ['text-probe', nextRef],
    queryFn: () => fetchText(nextRef, 'he'),
    staleTime: 60_000,
  });

  const canNext = probe == null ? undefined:
  (probe.he?.length ?? 0) > 0;

  function goNext() {
    if (!canNext) {
      router.replace('/'); // back to Home
      return;
    }
    setRef(nextRef);
    // warm the next-next
    const nn = nextChapter(nextRef);
    qc.prefetchQuery({
      queryKey: ['text-probe', nn],
      queryFn: () => fetchText(nn, 'he'),
      staleTime: 60_000,
    });
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {data?.ref ?? ref}
        </Text>

        {canNext ? (
          <CooldownButton
            onPress={goNext}
            readyLabel="Next Perek →"
            waitingLabel={probing ? 'Checking…' : 'Please wait'}
            durationMs={10_000}      // 10 seconds
            resetKey={ref}           // restart timer when chapter changes
          />
        ) : (
          <CooldownButton
            onPress={goNext}
            readyLabel="🎉 Mazal tov! Back to Reader"
            waitingLabel="🎉 Mazal tov!"
            durationMs={0}           // no wait on last perek
          />
        )}
      </View>

      {isLoading && (
        <Center>
          <ActivityIndicator />
          <Text style={styles.sub}>Loading…</Text>
        </Center>
      )}

      {isError && (
        <Center>
          <Text style={styles.error}>Couldn’t load.</Text>
          <Text style={styles.link} onPress={() => refetch()}>
            Try again
          </Text>
        </Center>
      )}

      {!isLoading && !isError && lines.length === 0 && (
        <Center>
          <Text style={styles.sub}>No text for this ref.</Text>
        </Center>
      )}

      {lines.length > 0 && (
        <FlatList
          contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl }}
          data={lines}
          keyExtractor={(_, i) => `${ref}-${i}`}
          renderItem={({ item, index }) => (
            <View style={styles.line}>
              <Text style={styles.idx}>{index + 1}</Text>
              <View style={styles.textWrap}>
                <Text style={styles.he}>{item}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            isFetching ? <ActivityIndicator style={{ marginTop: spacing.sm }} /> : null
          }
        />
      )}
    </View>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xs }}>
      {children}
    </View>
  );
}

function nextChapter(current: string) {
  const m = current.match(/^(.*\s)(\d+)(?::\d+)?$/);
  if (!m) return current;
  return `${m[1]}${parseInt(m[2], 10) + 1}`;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.uiBold,
    fontSize: typography.sizes.lg,
    lineHeight: typography.lineHeights.lg,
  },
  sub: {
    color: colors.textSecondary,
    fontFamily: typography.fonts.uiRegular,
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.sm,
  },
  error: {
    color: colors.accent, // Use an existing color property for errors
    fontFamily: typography.fonts.uiBold,
    fontSize: typography.sizes.md,
  },
  link: {
    color: colors.accent,
    marginTop: spacing.xs,
    fontFamily: typography.fonts.uiBold,
    fontSize: typography.sizes.sm,
  },
  line: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: spacing.sm,
    flexDirection: 'row-reverse',
    gap: spacing.sm,
    alignItems: 'center',          // ⟵ vertical centering for number + text
  },
  textWrap: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',      // ⟵ keep the paragraph centered in the row height
  },
  idx: {
    color: colors.textSecondary,
    width: 22,
    textAlign: 'center',
    fontFamily: typography.fonts.uiRegular,
    fontSize: typography.sizes.sm,
    lineHeight: typography.lineHeights.sm,
    textAlignVertical: 'center',   // ⟵ Android: center number vertically
  },
  he: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.heRegular,
    fontSize: typography.sizes.md,
    lineHeight: typography.lineHeights.lg,
    textAlign: 'right',
    writingDirection: 'rtl',
    includeFontPadding: false,
  },
});


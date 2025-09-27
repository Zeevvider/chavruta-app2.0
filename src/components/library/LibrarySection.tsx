// src/components/library/LibrarySection.tsx
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ViewStyle,
  ListRenderItem,
} from 'react-native';
import { spacing } from '../../styles/design-system';
import SectionHeader from './SectionHeader';
import LibraryCard, { LibraryCardProps } from './LibraryCard';

export interface LibraryItem {
  id: string;
  title: string;
  cover: string;
  ref: string;
  tags: string[];
  studyingCount?: number;
}

export interface LibrarySectionProps {
  title: string;
  items: LibraryItem[];
  onItemPress: (item: LibraryItem) => void;
  onSeeAllPress?: () => void;
  showSeeAll?: boolean;
  style?: ViewStyle;
  testID?: string;
}

const CARD_WIDTH = 130;
const CARD_GAP = 10;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

export default function LibrarySection({
  title,
  items,
  onItemPress,
  onSeeAllPress,
  showSeeAll = true,
  style,
  testID,
}: LibrarySectionProps) {
  const renderItem: ListRenderItem<LibraryItem> = ({ item }) => (
    <LibraryCard
      title={item.title}
      coverUri={item.cover}
      studyingCount={item.studyingCount}
      onPress={() => onItemPress(item)}
      testID={`library-card-${item.id}`}
    />
  );

  const getItemLayout = (_: any, index: number) => ({
    length: SNAP_INTERVAL,
    offset: SNAP_INTERVAL * index,
    index,
  });

  return (
    <View style={[styles.container, style]} testID={testID}>
      <SectionHeader
        title={title}
        onSeeAllPress={onSeeAllPress}
        showSeeAll={showSeeAll}
      />
      
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={SNAP_INTERVAL}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[3],
  },
  listContainer: {
    paddingHorizontal: spacing[2.5],
  },
});

// src/components/library/FilterRow.tsx
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { spacing } from '../../styles/design-system';
import FilterChip from './FilterChip';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterRowProps {
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  style?: ViewStyle;
  testID?: string;
}

export default function FilterRow({
  filters,
  activeFilter,
  onFilterChange,
  style,
  testID,
}: FilterRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
      testID={testID}
    >
      {filters.map((filter) => (
        <FilterChip
          key={filter.value}
          label={filter.label}
          isActive={activeFilter === filter.value}
          onPress={() => onFilterChange(filter.value)}
          testID={`filter-${filter.value}`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[3],
    paddingTop: spacing[3],
    paddingBottom: spacing[1],
  },
});

// src/theme.ts
// Re-export everything from the centralized design system
export * from './design-system';

// Legacy compatibility - these are now imported from design-system.ts
export { C, legacyColors as colors, spacing, typography } from './design-system';

// src/theme.ts
import { colors as baseColors } from './theme'; // adjust if path differs

// ---- Design tokens coming from your legacy theme (if present) ----
const legacy = (baseColors ?? {}) as any;

// ---- Normalized tokens you should use going forward ----
export const C = {
  bg:        legacy.background ?? '#FFF9F3',
  card:      legacy.surface ?? '#FFFFFF',
  cardMuted: legacy.cardMuted ?? '#FFF4E0',
  text:      legacy.textPrimary ?? '#1C1C1C',
  sub:       legacy.textSecondary ?? '#5C5C5C',
  border:    legacy.border ?? 'rgba(0, 0, 0, 0.08)',
  brand:     legacy.accent ?? '#FBBF24',
  accent:    legacy.accent ?? '#FBBF24',   // alias so C.accent works
  error:                      '#FF3B30', 
};

// ---- Back-compat named exports (old imports in your code) ----
export const colors = {
  background: C.bg,
  surface:    C.card,
  cardMuted:  C.cardMuted,
  textPrimary:   C.text,
  textSecondary: C.sub,
  border:     C.border,
  accent:     C.accent,
};

// If some files import spacing/typography, provide safe fallbacks:
export const spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 16,
  xl: 24,
};

export const typography = {
  fonts: {
    uiRegular: 'System',
    uiBold: 'System',
    heRegular: 'System',
    heBold: 'System',
  },
  sizes: { sm: 12, md: 14, lg: 16, xl: 20 },
  lineHeights: { sm: 16, md: 20, lg: 24, xl: 28 },
};

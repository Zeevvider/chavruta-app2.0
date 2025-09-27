// src/styles/design-system.ts
// Centralized design system for Chavruta App

// ===== COLORS =====
export const colors = {
  // Primary brand colors
  primary: {
    50: '#FFF9F3',
    100: '#FFF4E0',
    200: '#FFE4B5',
    300: '#FBBF24',
    400: '#F59E0B',
    500: '#D97706',
    600: '#B45309',
    700: '#92400E',
    800: '#78350F',
    900: '#451A03',
  },
  
  // Secondary colors
  secondary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  
  // Accent colors
  accent: {
    teal: '#2BB0B3',
    blue: '#3B82F6',
    purple: '#8B5CF6',
    pink: '#EC4899',
  },
  
  // Neutral colors
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  
  // Semantic colors
  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Background colors
  background: {
    primary: '#FFF9F3',
    secondary: '#FFFFFF',
    tertiary: '#FFF4E0',
    dark: '#0B0B0B',
    card: '#FFFFFF',
    cardMuted: '#FFF4E0',
  },
  
  // Text colors
  text: {
    primary: '#1C1C1C',
    secondary: '#5C5C5C',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    muted: '#6B7280',
  },
  
  // Border colors
  border: {
    light: 'rgba(0, 0, 0, 0.08)',
    medium: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(0, 0, 0, 0.24)',
    focus: '#3B82F6',
  },
} as const;

// ===== TYPOGRAPHY =====
export const typography = {
  // Font families
  fonts: {
    // UI fonts
    ui: {
      regular: 'UI-Regular',
      medium: 'UI-Medium',
      semibold: 'UI-SemiBold',
      bold: 'UI-Bold',
    },
    // Hebrew fonts
    hebrew: {
      regular: 'Hebrew-Regular',
      bold: 'Hebrew-Bold',
    },
    // Monospace for code
    mono: 'SFMono-Regular',
  },
  
  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Font weights
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Text styles
  styles: {
    // Headings
    h1: {
      fontSize: 36,
      fontWeight: '800',
      lineHeight: 1.2,
      fontFamily: 'UI-Bold',
    },
    h2: {
      fontSize: 30,
      fontWeight: '700',
      lineHeight: 1.2,
      fontFamily: 'UI-Bold',
    },
    h3: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 1.3,
      fontFamily: 'UI-Bold',
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 1.3,
      fontFamily: 'UI-SemiBold',
    },
    h5: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 1.4,
      fontFamily: 'UI-SemiBold',
    },
    h6: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 1.4,
      fontFamily: 'UI-SemiBold',
    },
    
    // Body text
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.6,
      fontFamily: 'UI-Regular',
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 1.6,
      fontFamily: 'UI-Regular',
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.5,
      fontFamily: 'UI-Regular',
    },
    
    // Labels and captions
    label: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 1.4,
      fontFamily: 'UI-Medium',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 1.4,
      fontFamily: 'UI-Regular',
    },
    
    // Hebrew text
    hebrew: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.6,
      fontFamily: 'Hebrew-Regular',
    },
    hebrewBold: {
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 1.6,
      fontFamily: 'Hebrew-Bold',
    },
  },
} as const;

// ===== SPACING =====
export const spacing = {
  px: 1,
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
} as const;

// ===== BORDER RADIUS =====
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

// ===== SHADOWS =====
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

// ===== BREAKPOINTS =====
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ===== Z-INDEX =====
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// ===== ANIMATION =====
export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// ===== COMPONENT THEMES =====
export const componentThemes = {
  button: {
    primary: {
      backgroundColor: colors.primary[500],
      textColor: colors.text.inverse,
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: 'transparent',
      textColor: colors.primary[500],
      borderColor: colors.primary[500],
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: colors.text.primary,
      borderColor: 'transparent',
    },
  },
  card: {
    default: {
      backgroundColor: colors.background.card,
      borderColor: colors.border.light,
      borderRadius: borderRadius.lg,
    },
    elevated: {
      backgroundColor: colors.background.card,
      borderColor: colors.border.light,
      borderRadius: borderRadius.lg,
      ...shadows.md,
    },
  },
  input: {
    default: {
      backgroundColor: colors.background.secondary,
      borderColor: colors.border.light,
      textColor: colors.text.primary,
    },
    focused: {
      backgroundColor: colors.background.secondary,
      borderColor: colors.border.focus,
      textColor: colors.text.primary,
    },
    error: {
      backgroundColor: colors.background.secondary,
      borderColor: colors.semantic.error,
      textColor: colors.text.primary,
    },
  },
} as const;

// ===== LEGACY COMPATIBILITY =====
// For backward compatibility with existing code
export const C = {
  bg: colors.background.primary,
  card: colors.background.card,
  cardMuted: colors.background.cardMuted,
  text: colors.text.primary,
  sub: colors.text.secondary,
  border: colors.border.light,
  brand: colors.primary[400],
  accent: colors.accent.teal,
  error: colors.semantic.error,
} as const;

// Export legacy colors object for backward compatibility
export const legacyColors = {
  background: C.bg,
  surface: C.card,
  cardMuted: C.cardMuted,
  textPrimary: C.text,
  textSecondary: C.sub,
  border: C.border,
  accent: C.accent,
} as const;

// ===== UTILITY FUNCTIONS =====
export const getTextStyle = (variant: keyof typeof typography.styles) => {
  return typography.styles[variant];
};

export const getSpacing = (size: keyof typeof spacing) => {
  return spacing[size];
};

export const getColor = (path: string) => {
  const keys = path.split('.');
  let value: any = colors;
  for (const key of keys) {
    value = value?.[key];
  }
  return value;
};

export const getShadow = (size: keyof typeof shadows) => {
  return shadows[size];
};

// ===== TYPE EXPORTS =====
export type ColorScale = typeof colors.primary;
export type TypographyVariant = keyof typeof typography.styles;
export type SpacingSize = keyof typeof spacing;
export type BorderRadiusSize = keyof typeof borderRadius;
export type ShadowSize = keyof typeof shadows;
export type ComponentTheme = keyof typeof componentThemes;

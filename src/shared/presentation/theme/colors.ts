export const colors = {
    primary: '#18181B',
    surface: '#FFFFFF',
    accent: '#4F46E5',
    accentLight: '#A5B4FC',
    accentBg: '#EEF2FF',
    border: '#E4E4E7',
    borderLight: '#F4F4F5',
    muted: '#71717A',
    mutedLight: '#A1A1AA',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',

    bgUnfocused: '#FAFAFA',
    bgDisabled: '#FAFAFA',
    textPrimary: '#18181B',
    textInverse: '#FFFFFF',
    label: '#52525B',
} as const;

export type ColorToken = keyof typeof colors;

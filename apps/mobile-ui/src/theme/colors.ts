export const colors = {
  light: {
    background: '#FFFFFF',
    text: '#1C1C1E',
    textSecondary: '#8E8E93',
    // Subtle frosted white overlay for translucent glass depth
    glassBackground: 'rgba(255, 255, 255, 0.75)',
    // Subtle dark rim border visible against pure white background
    glassBorder: 'rgba(0, 0, 0, 0.08)',
    // Highlight reflection
    glassHighlight: 'rgba(255, 255, 255, 0.9)',
    // Diagonal glass shine reflection gradient
    glassShine: ['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0)'] as readonly [string, string, string],
    tint: '#007AFF',
    tabBarBackground: 'rgba(255, 255, 255, 0.82)',
    solidFallback: '#F2F2F7',
    solidCardFallback: '#FFFFFF',
    solidBorder: 'rgba(0, 0, 0, 0.12)',
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    glassBackground: 'rgba(30, 30, 35, 0.65)',
    glassBorder: 'rgba(255, 255, 255, 0.18)',
    glassHighlight: 'rgba(255, 255, 255, 0.3)',
    glassShine: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0)'] as readonly [string, string, string],
    tint: '#0A84FF',
    tabBarBackground: 'rgba(28, 28, 30, 0.75)',
    solidFallback: '#121212',
    solidCardFallback: '#1C1C1E',
    solidBorder: 'rgba(255, 255, 255, 0.12)',
  },
};

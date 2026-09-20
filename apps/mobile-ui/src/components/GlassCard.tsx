import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LiquidGlassView } from './LiquidGlassView';
import { colors } from '../theme/colors';

import { useSettingsStore } from '../store/useSettingsStore';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, style }) => {
  const { dark } = useTheme();
  const themeColors = dark ? colors.dark : colors.light;
  const liquidGlass = useSettingsStore((state) => state.liquidGlass);

  return (
    <LiquidGlassView
      intensity={dark ? 30 : 60}
      tint={dark ? 'dark' : 'light'}
      fallbackColor={themeColors.solidCardFallback}
      style={[
        styles.card,
        {
          borderColor: liquidGlass ? themeColors.glassBorder : themeColors.solidBorder,
          backgroundColor: themeColors.glassBackground, // subtle tint
        },
        style,
      ]}
    >
      {children}
    </LiquidGlassView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    // Soft shadows for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
});

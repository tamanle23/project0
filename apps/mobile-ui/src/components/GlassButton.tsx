import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LiquidGlassView } from './LiquidGlassView';
import { colors } from '../theme/colors';

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ title, onPress, style }) => {
  const { dark } = useTheme();
  const themeColors = dark ? colors.dark : colors.light;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.7 },
        style,
      ]}
    >
      <LiquidGlassView
        intensity={80}
        tint={dark ? 'light' : 'dark'} // Contrast tint
        fallbackColor={themeColors.tint}
        borderRadius={24}
        style={[
          styles.glass,
          { borderColor: themeColors.glassBorder }
        ]}
      >
        <Text style={[styles.text, { color: dark ? '#000' : '#FFF' }]}>{title}</Text>
      </LiquidGlassView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  glass: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

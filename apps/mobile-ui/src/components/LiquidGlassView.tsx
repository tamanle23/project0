import React from 'react';
import { View, ViewProps, StyleSheet, Platform, ViewStyle, Image, useColorScheme } from 'react-native';
import { BlurView, BlurTint } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSettingsStore } from '../store/useSettingsStore';
import { colors } from '../theme/colors';

interface LiquidGlassViewProps extends ViewProps {
  intensity?: number;
  tint?: BlurTint;
  fallbackColor?: string;
  borderRadius?: number;
  outerStyle?: ViewStyle;
}

// A tiny 4x4 repeating noise map to give the glass physical grain
const NOISE_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuRwZ3AAAAMElEQVR42mOQAAEM0wwYwECAEAAxGSAE0QzMgCAIYoAGMAAIYpAGMEAUgAGiAAwQAABnUAN8zZ35/QAAAABJRU5ErkJggg==';

export const LiquidGlassView: React.FC<LiquidGlassViewProps> = ({
  intensity = 60,
  tint = 'default',
  fallbackColor,
  borderRadius = 16,
  style,
  outerStyle,
  children,
  ...props
}) => {
  const liquidGlass = useSettingsStore((state) => state.liquidGlass);
  const globalIntensity = useSettingsStore((state) => state.glassIntensity);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  const isAndroid = Platform.OS === 'android';
  
  const androidApiLevel = typeof Platform.Version === 'number' ? Platform.Version : parseInt(String(Platform.Version), 10);
  const useFallback = !liquidGlass || (isAndroid && androidApiLevel < 24);

  const flatStyle = (StyleSheet.flatten(style) || {}) as ViewStyle;

  // Extract shadow and positioning properties for the outer unclipped wrapper
  // so overflow: 'hidden' on BlurView doesn't clip drop shadows.
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation,
    margin,
    marginVertical,
    marginHorizontal,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    position,
    top,
    bottom,
    left,
    right,
    zIndex,
    width,
    height,
    maxWidth,
    minWidth,
    alignSelf,
    flex,
    ...innerStyle
  } = flatStyle;

  const shadowContainerStyle: ViewStyle = {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation,
    margin,
    marginVertical,
    marginHorizontal,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    position,
    top,
    bottom,
    left,
    right,
    zIndex,
    width,
    height,
    maxWidth,
    minWidth,
    alignSelf,
    flex,
    borderRadius,
    ...outerStyle,
  };

  const resolvedFallbackColor = fallbackColor || theme.solidFallback;

  const isAbsolute = position === 'absolute' || (top !== undefined && bottom !== undefined);
  const innerWidth = width ? '100%' : (isAbsolute ? '100%' : undefined);
  const innerHeight = height ? '100%' : (isAbsolute ? '100%' : undefined);

  if (useFallback) {
    const { backgroundColor: _ignored, ...cleanInnerStyle } = innerStyle;
    return (
      <View style={shadowContainerStyle}>
        <View
          style={[
            cleanInnerStyle,
            {
              borderRadius,
              overflow: 'hidden',
              width: innerWidth,
              height: innerHeight,
              backgroundColor: resolvedFallbackColor,
              borderColor: theme.solidBorder,
              borderWidth: StyleSheet.hairlineWidth,
            },
          ]}
          {...props}
        >
          {children}
        </View>
      </View>
    );
  }

  const effectiveIntensity = Math.min(100, Math.max(1, Math.round((intensity * (globalIntensity ?? 20)) / 100)));
  const intensityFactor = (globalIntensity ?? 20) / 100;

  return (
    <View style={shadowContainerStyle}>
      <BlurView
        intensity={effectiveIntensity}
        tint={tint}
        style={[
          {
            borderRadius,
            overflow: 'hidden',
            width: innerWidth,
            height: innerHeight,
          },
          innerStyle,
        ]}
        {...props}
      >
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Image
            source={{ uri: NOISE_BASE64 }}
            style={[
              StyleSheet.absoluteFill,
              { opacity: (colorScheme === 'dark' ? 0.08 : 0.04) * intensityFactor },
            ]}
            resizeMode="repeat"
          />
          <LinearGradient
            colors={theme.glassShine}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius,
                opacity: intensityFactor,
              },
            ]}
          />
        </View>
        {children}
      </BlurView>
    </View>
  );
};

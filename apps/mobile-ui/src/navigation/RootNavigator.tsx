import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DashboardScreen } from '../screens/DashboardScreen';
import { CreatePostScreen } from '../screens/CreatePostScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LiquidGlassView } from '../components/LiquidGlassView';
import { StreamlineColorIcon } from '../components/icons/StreamlineColorIcon';
import { RootTabParamList } from '../types';
import { colors } from '../theme/colors';
import { useSettingsStore } from '../store/useSettingsStore';

const Tab = createBottomTabNavigator<RootTabParamList>();

const GlassTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { dark } = useTheme();
  const insets = useSafeAreaInsets();
  const themeColors = dark ? colors.dark : colors.light;
  const liquidGlass = useSettingsStore((state) => state.liquidGlass);

  const bottomInset = Math.max(insets.bottom, 16);
  const barHeight = 56 + bottomInset;

  return (
    <View style={styles.tabBarContainer}>
      <LiquidGlassView
        intensity={dark ? 60 : 90}
        tint={dark ? 'dark' : 'light'}
        fallbackColor={themeColors.solidFallback}
        borderRadius={0}
        style={[
          styles.tabBar,
          {
            height: barHeight,
            paddingBottom: bottomInset - 6,
            borderTopColor: liquidGlass ? themeColors.glassHighlight : themeColors.solidBorder,
            backgroundColor: liquidGlass ? themeColors.tabBarBackground : themeColors.solidFallback,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconType: 'home' | 'create' | 'profile' = 'home';
          if (route.name === 'CreatePost') iconType = 'create';
          if (route.name === 'Profile') iconType = 'profile';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <StreamlineColorIcon
                name={iconType}
                focused={isFocused}
                size={32}
                activeColor={themeColors.tint}
                inactiveColor={themeColors.textSecondary}
              />
            </TouchableOpacity>
          );
        })}
      </LiquidGlassView>
    </View>
  );
};

export const RootNavigator = () => {
  const { dark } = useTheme();
  const themeColors = dark ? colors.dark : colors.light;
  const liquidGlass = useSettingsStore((state) => state.liquidGlass);

  return (
    <Tab.Navigator
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: { fontWeight: '600' },
        headerBackground: () => (
          <LiquidGlassView
            intensity={dark ? 50 : 85}
            tint={dark ? 'dark' : 'light'}
            fallbackColor={themeColors.solidFallback}
            borderRadius={0}
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: liquidGlass ? themeColors.glassBackground : themeColors.solidFallback,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: liquidGlass ? themeColors.glassBorder : themeColors.solidBorder,
              },
            ]}
          />
        ),
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ title: 'Create Post' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    // Subtle top shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  icon: {
    padding: 10,
  },
});


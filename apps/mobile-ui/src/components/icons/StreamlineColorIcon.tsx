import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

export interface StreamlineColorIconProps {
  name: 'home' | 'create' | 'profile';
  focused: boolean;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export const StreamlineColorIcon: React.FC<StreamlineColorIconProps> = ({
  name,
  focused,
  size = 34,
  activeColor = '#007AFF',
  inactiveColor = '#8E8E93',
}) => {
  if (name === 'home') {
    if (focused) {
      // Streamline Ultimate Duotone - Free
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Secondary Layer: 20% Wash Fill */}
          <Path
            d="M4.5 10.5L12 3.8L19.5 10.5V20C19.5 20.55 19.05 21 18.5 21H5.5C4.95 21 4.5 20.55 4.5 20V10.5Z"
            fill={activeColor}
            opacity={0.2}
          />
          {/* Doorway secondary fill depth */}
          <Path
            d="M9.8 21V15C9.8 14.45 10.25 14 10.8 14H13.2C13.75 14 14.2 14.45 14.2 15V21H9.8Z"
            fill={activeColor}
            opacity={0.3}
          />

          {/* Primary Layer: 100% Accent Contour Lines */}
          <Path
            d="M16.5 6.5V4H19V8.5"
            stroke={activeColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M2.5 10.5L12 3L21.5 10.5"
            stroke={activeColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M4.5 10.5V20C4.5 20.55 4.95 21 5.5 21H18.5C19.05 21 19.5 20.55 19.5 20V10.5"
            stroke={activeColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M9.8 21V15C9.8 14.45 10.25 14 10.8 14H13.2C13.75 14 14.2 14.45 14.2 15V21"
            stroke={activeColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    }

    // Streamline Ultimate Light - Free
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M16.5 6.5V4H19V8.5"
          stroke={inactiveColor}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.5 10.5L12 3L21.5 10.5"
          stroke={inactiveColor}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.5 10.5V20C4.5 20.55 4.95 21 5.5 21H18.5C19.05 21 19.5 20.55 19.5 20V10.5"
          stroke={inactiveColor}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10 21V15C10 14.45 10.45 14 11 14H13C13.55 14 14 14.45 14 15V21"
          stroke={inactiveColor}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (name === 'create') {
    if (focused) {
      // Streamline Ultimate Duotone - Free
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Secondary Layer: 20% Wash Fill */}
          <Circle cx="12" cy="12" r="9" fill={activeColor} opacity={0.2} />

          {/* Primary Layer: 100% Accent Contour & Plus */}
          <Circle cx="12" cy="12" r="9" stroke={activeColor} strokeWidth="1.8" />
          <Path
            d="M12 7.6V16.4M7.6 12H16.4"
            stroke={activeColor}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </Svg>
      );
    }

    // Streamline Ultimate Light - Free
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="9" stroke={inactiveColor} strokeWidth="1.25" />
        <Path
          d="M12 8V16M8 12H16"
          stroke={inactiveColor}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </Svg>
    );
  }

  if (name === 'profile') {
    if (focused) {
      // Streamline Ultimate Duotone - Free
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          {/* Secondary Layer: 20% Wash Fill */}
          <Circle cx="12" cy="7.8" r="3.8" fill={activeColor} opacity={0.2} />
          <Path
            d="M4.5 20.5C4.5 16.63 7.63 13.5 11.5 13.5H12.5C16.37 13.5 19.5 16.63 19.5 20.5V21H4.5V20.5Z"
            fill={activeColor}
            opacity={0.2}
          />

          {/* Primary Layer: 100% Accent Contour */}
          <Circle cx="12" cy="7.8" r="3.8" stroke={activeColor} strokeWidth="1.8" />
          <Path
            d="M4.5 20.5C4.5 16.63 7.63 13.5 11.5 13.5H12.5C16.37 13.5 19.5 16.63 19.5 20.5"
            stroke={activeColor}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <Path
            d="M10 13.8C10.5 14.8 11.2 15.3 12 15.3C12.8 15.3 13.5 14.8 14 13.8"
            stroke={activeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </Svg>
      );
    }

    // Streamline Ultimate Light - Free
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="7.8" r="3.8" stroke={inactiveColor} strokeWidth="1.25" />
        <Path
          d="M4.5 20.5C4.5 16.63 7.63 13.5 11.5 13.5H12.5C16.37 13.5 19.5 16.63 19.5 20.5"
          stroke={inactiveColor}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </Svg>
    );
  }

  return null;
};

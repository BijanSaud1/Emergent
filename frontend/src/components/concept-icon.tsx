import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";

// Map the emojis used in mock data to Material Community Icon names.
// Keeping the emoji field lets mock data stay simple; this map is the single
// source of truth for visual icons across the app.
const emojiToIcon: Record<string, string> = {
  // Subjects
  "🧠": "brain",
  "🌿": "leaf",
  "⚛️": "atom",
  "🚋": "scale-balance", // philosophy = ethics
  "🏛️": "bank",
  "🪐": "earth",
  "🕳️": "circle-slice-8",
  "☄️": "star-shooting",
  "🌀": "sync",
  "🦎": "dna",
  "🧬": "dna",
  "🌸": "flower",
  "🌍": "earth",
  "🌱": "sprout",

  // Actions / accents
  "💡": "lightbulb-on",
  "🔥": "fire",
  "⚡": "lightning-bolt",
  "🎯": "target",
  "🏆": "trophy",
  "🌙": "moon-waning-crescent",
  "🚀": "rocket-launch",
  "🐛": "bug",
  "🗺️": "map",
  "🔎": "magnify",
  "🎉": "party-popper",
  "👑": "crown",
  "🔬": "microscope",
  "🔭": "telescope",
  "🪞": "mirror",
  "⏳": "timer-sand",
  "🧭": "compass",
  "🥇": "medal",
  "🥈": "medal-outline",
  "🥉": "medal-outline",
  "⭐": "star",
  "📚": "book-open-variant",
  "📊": "chart-bar",
  "📱": "cellphone",
  "🎨": "palette",
  "📖": "book-open-page-variant",
  "🪐 ": "earth",
  "🏅": "medal",
  "💪": "arm-flex",
  "🧊🔥": "fire",
};

export function iconFromEmoji(emoji: string, fallback = "star-four-points") {
  return emojiToIcon[emoji] ?? fallback;
}

type Props = {
  emoji: string;
  size?: number;
  color?: string;
  containerSize?: number;
  containerColor?: string;
  containerStyle?: ViewStyle;
  rounded?: boolean;
};

export function ConceptIcon({
  emoji,
  size = 22,
  color = "#FFFFFF",
  containerSize,
  containerColor,
  containerStyle,
  rounded = true,
}: Props) {
  const iconName = iconFromEmoji(emoji);
  const hasContainer = !!containerSize || !!containerColor;
  if (!hasContainer) {
    return (
      <MaterialDesignIcons
        name={iconName as any}
        size={size}
        color={color}
      />
    );
  }
  const s = containerSize ?? 44;
  return (
    <View
      style={[
        {
          width: s,
          height: s,
          borderRadius: rounded ? s / 2 : 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: containerColor,
        },
        containerStyle,
      ]}
    >
      <MaterialDesignIcons name={iconName as any} size={size} color={color} />
    </View>
  );
}

import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, radius } from "@/src/theme";

type Props = {
  progress: number; // 0..1
  height?: number;
  trackColor?: string;
  fillColor?: string;
};

export function ProgressBar({
  progress,
  height = 8,
  trackColor = colors.surfaceTertiary,
  fillColor = colors.brandPrimary,
}: Props) {
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: trackColor, borderRadius: radius.pill },
      ]}
    >
      <View
        style={{
          height,
          width: `${clamped * 100}%`,
          backgroundColor: fillColor,
          borderRadius: radius.pill,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
  },
});

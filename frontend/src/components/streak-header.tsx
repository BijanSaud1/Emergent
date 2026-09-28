import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Feather from "@react-native-vector-icons/feather";
import { colors, radius, spacing } from "@/src/theme";

type Props = {
  streak: number;
  onPressAvatar?: () => void;
  avatar: string;
  title: string;
  subtitle?: string;
};

export function StreakHeader({ streak, title, subtitle }: Props) {
  return (
    <View style={styles.row} testID="streak-header">
      <View style={{ flex: 1 }}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable style={styles.streakPill} testID="streak-pill">
        <Feather name="zap" size={16} color={colors.onBrandSecondary} />
        <Text style={styles.streakText}>{streak}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.onSurface,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.muted,
    marginBottom: 2,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: spacing.md,
    height: 36,
    borderRadius: radius.pill,
  },
  streakText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onBrandSecondary,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@react-native-vector-icons/feather";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";
import { usesNativeTabs } from "@/src/navigation";
import { dailyChallenge, challenges, leaderboard } from "@/src/data/mock";

const difficulties = ["All", "Easy", "Medium", "Hard"] as const;

export default function ChallengesScreen() {
  const insets = useSafeAreaInsets();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;
  const scrollPadBottom = spacing.xxl;
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("All");

  const filtered = challenges.filter(
    (c) => difficulty === "All" || c.difficulty === difficulty,
  );

  return (
    <View style={styles.container} testID="challenges-screen">
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Challenges</Text>
            <Text style={styles.subtitle}>Test your understanding</Text>
          </View>
          <View style={styles.xpBadge}>
            <Feather name="zap" size={14} color={colors.onBrandSecondary} />
            <Text style={styles.xpBadgeText}>4,820</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scrollPadBottom + bottomChrome }}
      >
        {/* Daily Challenge Hero */}
        <View style={styles.heroWrapper}>
          <LinearGradient
            colors={["#04B077", "#028F60"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroTagRow}>
              <View style={styles.heroTag}>
                <Feather name="star" size={11} color={colors.onBrandSecondary} />
                <Text style={styles.heroTagText}>Daily Challenge</Text>
              </View>
              <View style={styles.heroPill}>
                <Feather name="clock" size={11} color={colors.onBrandPrimary} />
                <Text style={styles.heroPillText}>
                  {dailyChallenge.timeLimit}
                </Text>
              </View>
            </View>

            <Text style={styles.heroTitle}>{dailyChallenge.title}</Text>
            <Text style={styles.heroDesc}>{dailyChallenge.description}</Text>

            <View style={styles.heroFooter}>
              <View style={styles.heroReward}>
                <Feather name="zap" size={14} color={colors.brandSecondary} />
                <Text style={styles.heroRewardText}>
                  +{dailyChallenge.xp} XP
                </Text>
              </View>
              <Pressable style={styles.heroBtn} testID="start-daily-btn">
                <Text style={styles.heroBtnText}>Start now</Text>
                <Feather name="arrow-right" size={14} color={colors.onSurface} />
              </Pressable>
            </View>
          </LinearGradient>
        </View>

        {/* Segmented control */}
        <View style={styles.segmented} testID="difficulty-segmented">
          {difficulties.map((d) => {
            const selected = difficulty === d;
            return (
              <Pressable
                key={d}
                onPress={() => setDifficulty(d)}
                style={[styles.segment, selected && styles.segmentActive]}
                testID={`difficulty-${d}`}
              >
                <Text
                  style={[
                    styles.segmentText,
                    selected
                      ? { color: colors.onSurface }
                      : { color: colors.muted },
                  ]}
                >
                  {d}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Challenges list */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice</Text>
          {filtered.map((c) => (
            <Pressable
              key={c.id}
              style={styles.challengeCard}
              testID={`challenge-${c.id}`}
            >
              <View
                style={[
                  styles.diffDot,
                  { backgroundColor: diffColor(c.difficulty) },
                ]}
              />
              <View style={{ flex: 1 }}>
                <View style={styles.challengeTop}>
                  <Text style={styles.challengeTitle} numberOfLines={1}>
                    {c.title}
                  </Text>
                  {c.solved && (
                    <View style={styles.solvedTag}>
                      <Feather name="check" size={10} color={colors.onSuccess} />
                    </View>
                  )}
                </View>
                <Text style={styles.challengeDesc} numberOfLines={1}>
                  {c.description}
                </Text>
                <View style={styles.challengeMeta}>
                  <Text style={[styles.diffText, { color: diffColor(c.difficulty) }]}>
                    {c.difficulty}
                  </Text>
                  <Text style={styles.metaDot}>·</Text>
                  <Text style={styles.challengeMetaText}>{c.language}</Text>
                  <Text style={styles.metaDot}>·</Text>
                  <Feather name="zap" size={11} color={colors.brandSecondary} />
                  <Text style={[styles.challengeMetaText, { fontWeight: "700", color: colors.onSurface }]}>
                    {c.xp}
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color={colors.muted} />
            </Pressable>
          ))}
        </View>

        {/* Leaderboard */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Leaderboard</Text>
            <View style={styles.weekPill}>
              <Text style={styles.weekPillText}>This week</Text>
            </View>
          </View>
          <View style={styles.leaderCard}>
            {leaderboard.map((e, idx) => {
              const isTop3 = e.rank <= 3;
              const rankBg =
                e.rank === 1
                  ? colors.brandSecondary
                  : e.rank === 2
                  ? colors.borderStrong
                  : e.rank === 3
                  ? colors.brandTertiary
                  : colors.surfaceTertiary;
              const rankColor =
                e.rank === 1
                  ? colors.onBrandSecondary
                  : e.rank === 3
                  ? colors.onBrandTertiary
                  : colors.onSurface;
              return (
                <View
                  key={e.id}
                  style={[
                    styles.leaderRow,
                    idx < leaderboard.length - 1 && styles.leaderDivider,
                    e.isYou && { backgroundColor: colors.brandPrimary + "0F" },
                  ]}
                  testID={`leader-${e.rank}`}
                >
                  <View style={[styles.rankBadge, { backgroundColor: rankBg }]}>
                    <Text style={[styles.rankText, { color: rankColor }]}>
                      {e.rank}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: e.avatar }}
                    style={styles.leaderAvatar}
                    contentFit="cover"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.leaderName}>
                      {e.name}
                      {e.isYou && (
                        <Text style={{ color: colors.brandPrimary }}> · You</Text>
                      )}
                    </Text>
                    <Text style={styles.leaderXp}>
                      {e.xp.toLocaleString()} XP
                    </Text>
                  </View>
                  {isTop3 && (
                    <MaterialDesignIcons
                      name={e.rank === 1 ? "medal" : "medal-outline"}
                      size={20}
                      color={
                        e.rank === 1
                          ? colors.brandSecondary
                          : e.rank === 2
                          ? colors.borderStrong
                          : colors.brandTertiary
                      }
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function diffColor(d: "Easy" | "Medium" | "Hard") {
  if (d === "Easy") return colors.brandPrimary;
  if (d === "Medium") return colors.brandSecondary;
  return colors.brandTertiary;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  header: {
    backgroundColor: colors.surface,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.muted,
    marginTop: 2,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: spacing.md,
    height: 32,
    borderRadius: radius.pill,
  },
  xpBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.onBrandSecondary,
  },

  heroWrapper: { paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  hero: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: "#04B077",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: { elevation: 6 },
    }),
  },
  heroTagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  heroTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  heroTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onBrandSecondary,
  },
  heroPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  heroPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.onBrandPrimary,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.onBrandPrimary,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  heroDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginBottom: spacing.lg,
    lineHeight: 18,
  },
  heroFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroReward: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heroRewardText: {
    color: colors.onBrandPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  heroBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    height: 40,
    borderRadius: radius.pill,
  },
  heroBtnText: { color: colors.onSurface, fontSize: 13, fontWeight: "700" },

  segmented: {
    flexDirection: "row",
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    backgroundColor: colors.surfaceTertiary,
    borderRadius: radius.md,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 36,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentActive: {
    backgroundColor: colors.surfaceSecondary,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: { elevation: 1 },
    }),
  },
  segmentText: { fontSize: 13, fontWeight: "600" },

  section: { marginTop: spacing.xl, paddingHorizontal: spacing.lg },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.3,
    marginBottom: spacing.md,
  },
  weekPill: {
    backgroundColor: colors.surfaceTertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  weekPillText: { fontSize: 11, fontWeight: "700", color: colors.onSurface },

  challengeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  diffDot: { width: 6, height: 40, borderRadius: 3 },
  challengeTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
    flex: 1,
  },
  solvedTag: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },
  challengeDesc: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
    marginBottom: 6,
  },
  challengeMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  challengeMetaText: { fontSize: 11, color: colors.muted, fontWeight: "500" },
  metaDot: { color: colors.muted, fontSize: 11 },
  diffText: { fontSize: 11, fontWeight: "700" },

  leaderCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  leaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
  },
  leaderDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: { fontSize: 13, fontWeight: "700" },
  leaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceTertiary,
  },
  leaderName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
  },
  leaderXp: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.muted,
    marginTop: 2,
  },
  medalEmoji: { fontSize: 20 },
});

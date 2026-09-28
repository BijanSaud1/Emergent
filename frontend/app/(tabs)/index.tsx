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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";
import { usesNativeTabs } from "@/src/navigation";
import { StreakHeader } from "@/src/components/streak-header";
import { ProgressBar } from "@/src/components/progress-bar";
import { StreakFreezeModal } from "@/src/components/streak-freeze-modal";
import {
  user,
  continueLearning,
  dailyGoals,
  courses,
  learningPaths,
  factOfTheDay,
} from "@/src/data/mock";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;
  const scrollPadBottom = spacing.xxl;
  const [showFreeze, setShowFreeze] = useState(false);
  const [savedFact, setSavedFact] = useState(false);

  const trending = courses.slice(0, 4);

  return (
    <View style={styles.container} testID="home-screen">
      <View style={[styles.stickyHeader, { paddingTop: insets.top + spacing.md }]}>
        <StreakHeader
          streak={user.streak}
          title={`Hi, ${user.name.split(" ")[0]} 👋`}
          subtitle="What will you learn today?"
          avatar={user.avatar}
          onPressStreak={() => setShowFreeze(true)}
        />
      </View>

      <StreakFreezeModal
        visible={showFreeze}
        streak={user.streak}
        onClose={() => setShowFreeze(false)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scrollPadBottom + bottomChrome,
        }}
      >
        {/* Continue Learning hero */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <Pressable
            style={styles.heroCard}
            testID="continue-learning-card"
            onPress={() => router.push(`/concept/${continueLearning.id === "c-1" ? "1" : "1"}/learn`)}
          >
            <Image
              source={{ uri: continueLearning.image }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              transition={200}
            />
            <LinearGradient
              colors={["rgba(19,22,20,0.05)", "rgba(19,22,20,0.85)"]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.heroBadge}>
              <Feather name="play" size={12} color={colors.onBrandPrimary} />
              <Text style={styles.heroBadgeText}>Resume</Text>
            </View>
            <View style={styles.heroContent}>
              <Text style={styles.heroCourse}>
                {continueLearning.courseTitle}
              </Text>
              <Text style={styles.heroLesson}>
                {continueLearning.lessonTitle}
              </Text>
              <View style={styles.heroFooter}>
                <View style={{ flex: 1 }}>
                  <ProgressBar
                    progress={continueLearning.progress}
                    fillColor={colors.brandSecondary}
                    trackColor="rgba(255,255,255,0.25)"
                  />
                </View>
                <Text style={styles.heroProgress}>
                  {continueLearning.lessonNumber}/
                  {continueLearning.totalLessons}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Fact of the Day */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Fact of the Day</Text>
            <View style={styles.factDate}>
              <Feather name="calendar" size={11} color={colors.onSurface} />
              <Text style={styles.factDateText}>Today</Text>
            </View>
          </View>
          <View
            style={[
              styles.factCard,
              {
                backgroundColor: factOfTheDay.color + "18",
                borderColor: factOfTheDay.color + "55",
              },
            ]}
            testID="fact-of-the-day"
          >
            <View style={styles.factRow}>
              <View
                style={[
                  styles.factEmojiBox,
                  { backgroundColor: factOfTheDay.color },
                ]}
              >
                <Text style={styles.factEmoji}>{factOfTheDay.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.factTopic}>{factOfTheDay.topic}</Text>
                <Text style={styles.factTitle}>{factOfTheDay.title}</Text>
              </View>
            </View>
            <Text style={styles.factBody}>{factOfTheDay.body}</Text>
            <Pressable
              onPress={() => setSavedFact((s) => !s)}
              style={[
                styles.factSaveBtn,
                savedFact && { backgroundColor: colors.brandPrimary },
              ]}
              testID="save-fact-btn"
            >
              <Feather
                name={savedFact ? "check" : "bookmark"}
                size={14}
                color={savedFact ? colors.onBrandPrimary : colors.onSurface}
              />
              <Text
                style={[
                  styles.factSaveText,
                  savedFact && { color: colors.onBrandPrimary },
                ]}
              >
                {savedFact ? "Saved to bookmarks" : "Save to bookmarks"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Daily Goals */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Daily Goals</Text>
            <Text style={styles.sectionMeta}>2 of 3 done</Text>
          </View>
          <View style={styles.goalsCard} testID="daily-goals-card">
            {dailyGoals.map((g, idx) => (
              <View
                key={g.id}
                style={[
                  styles.goalRow,
                  idx < dailyGoals.length - 1 && styles.goalRowDivider,
                ]}
              >
                <View
                  style={[
                    styles.goalCheck,
                    g.done && { backgroundColor: colors.brandPrimary },
                  ]}
                >
                  {g.done && (
                    <Feather name="check" size={14} color={colors.onBrandPrimary} />
                  )}
                </View>
                <Text
                  style={[
                    styles.goalLabel,
                    g.done && { textDecorationLine: "line-through", color: colors.muted },
                  ]}
                >
                  {g.label}
                </Text>
                <View style={styles.xpPill}>
                  <Text style={styles.xpText}>+{g.xp} XP</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Learning Paths */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Learning Paths</Text>
            <Pressable>
              <Text style={styles.sectionAction}>See all</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: spacing.md,
              paddingHorizontal: spacing.lg,
            }}
          >
            {learningPaths.map((p) => (
              <Pressable
                key={p.id}
                style={[styles.pathCard, { backgroundColor: p.color }]}
                testID={`path-${p.id}`}
              >
                <Text style={styles.pathEmoji}>{p.emoji}</Text>
                <Text
                  style={[
                    styles.pathTitle,
                    p.color === "#FFC800"
                      ? { color: colors.onBrandSecondary }
                      : { color: colors.onBrandPrimary },
                  ]}
                >
                  {p.title}
                </Text>
                <Text
                  style={[
                    styles.pathMeta,
                    p.color === "#FFC800"
                      ? { color: colors.onBrandSecondary }
                      : { color: "rgba(255,255,255,0.85)" },
                  ]}
                >
                  {p.courses} courses · {p.hours}h
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Trending Concepts */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Trending Concepts</Text>
            <Pressable>
              <Text style={styles.sectionAction}>See all</Text>
            </Pressable>
          </View>
          <View style={styles.grid}>
            {trending.map((c) => (
              <Pressable
                key={c.id}
                style={styles.skillCard}
                testID={`skill-${c.id}`}
                onPress={() => router.push(`/concept/${c.id}`)}
              >
                <View
                  style={[
                    styles.skillIconBox,
                    { backgroundColor: c.color + "22" },
                  ]}
                >
                  <Text style={styles.skillEmoji}>{c.emoji}</Text>
                </View>
                <Text style={styles.skillTitle} numberOfLines={1}>
                  {c.title}
                </Text>
                <Text style={styles.skillMeta}>
                  {c.category} · {c.duration}
                </Text>
                <View style={styles.skillFooter}>
                  <View style={styles.xpPillSmall}>
                    <Feather name="zap" size={10} color={colors.onBrandSecondary} />
                    <Text style={styles.xpSmallText}>{c.xp} XP</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  stickyHeader: {
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.onSurface,
    letterSpacing: -0.3,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  sectionMeta: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.brandPrimary,
    marginBottom: spacing.md,
  },
  sectionAction: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.brandPrimary,
    marginBottom: spacing.md,
  },

  // Hero
  heroCard: {
    marginHorizontal: spacing.lg,
    height: 200,
    borderRadius: radius.lg,
    overflow: "hidden",
    justifyContent: "flex-end",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  heroBadge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.brandPrimary,
    paddingHorizontal: spacing.md,
    height: 28,
    borderRadius: radius.pill,
  },
  heroBadgeText: {
    color: colors.onBrandPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  heroContent: {
    padding: spacing.lg,
  },
  heroCourse: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroLesson: {
    color: colors.onSurfaceInverse,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: -0.4,
    marginBottom: spacing.md,
  },
  heroFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  heroProgress: {
    color: colors.onSurfaceInverse,
    fontSize: 13,
    fontWeight: "700",
  },

  // Goals
  goalsCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  goalRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  goalCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  goalLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: colors.onSurface,
  },
  xpPill: {
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  xpText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onBrandSecondary,
  },

  // Paths
  pathCard: {
    width: 180,
    height: 140,
    borderRadius: radius.lg,
    padding: spacing.lg,
    justifyContent: "space-between",
  },
  pathEmoji: { fontSize: 32 },
  pathTitle: { fontSize: 17, fontWeight: "700", marginTop: spacing.sm },
  pathMeta: { fontSize: 12, fontWeight: "500", marginTop: 4 },

  // Skills grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  skillCard: {
    width: "48%",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skillIconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  skillEmoji: { fontSize: 24 },
  skillTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
    marginBottom: 2,
  },
  skillMeta: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  skillFooter: { flexDirection: "row" },
  xpPillSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  xpSmallText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.onBrandSecondary,
  },

  // Fact of the day
  factDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surfaceTertiary,
    paddingHorizontal: spacing.md,
    height: 26,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  factDateText: { fontSize: 11, fontWeight: "700", color: colors.onSurface },
  factCard: {
    marginHorizontal: spacing.lg,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1.5,
    gap: spacing.md,
  },
  factRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  factEmojiBox: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  factEmoji: { fontSize: 28 },
  factTopic: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurface,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    opacity: 0.7,
    marginBottom: 2,
  },
  factTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  factBody: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurface,
    fontWeight: "500",
    opacity: 0.85,
  },
  factSaveBtn: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  factSaveText: { fontSize: 12, fontWeight: "700", color: colors.onSurface },
});

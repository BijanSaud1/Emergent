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
import { ConceptIcon, iconFromEmoji } from "@/src/components/concept-icon";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
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

  const trending = courses.slice(0, 5);
  const trendingStats = ["12.4k", "8.7k", "6.3k", "5.1k", "4.2k"];

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
                <MaterialDesignIcons
                  name={iconFromEmoji(factOfTheDay.emoji) as any}
                  size={26}
                  color={colors.onBrandSecondary}
                />
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
          <View style={styles.pathList}>
            {learningPaths.map((p) => {
              const progress = p.completed / p.courses;
              return (
                <Pressable
                  key={p.id}
                  style={styles.pathCard}
                  testID={`path-${p.id}`}
                >
                  <LinearGradient
                    colors={p.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.pathGradient}
                  >
                    <View style={styles.pathTopRow}>
                      <View style={styles.pathKickerPill}>
                        <Text
                          style={[
                            styles.pathKicker,
                            p.color === "#FFC800"
                              ? { color: colors.onBrandSecondary }
                              : { color: "#FFFFFF" },
                          ]}
                        >
                          PATH · {p.courses} concepts · {p.hours}h
                        </Text>
                      </View>
                      <View style={styles.pathEmojiMedallion}>
                        <MaterialDesignIcons
                          name={iconFromEmoji(p.emoji) as any}
                          size={30}
                          color={p.color}
                        />
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.pathTitleBig,
                        p.color === "#FFC800"
                          ? { color: colors.onBrandSecondary }
                          : { color: "#FFFFFF" },
                      ]}
                    >
                      {p.title}
                    </Text>
                    <Text
                      style={[
                        styles.pathTagline,
                        p.color === "#FFC800"
                          ? { color: "rgba(74,58,0,0.8)" }
                          : { color: "rgba(255,255,255,0.9)" },
                      ]}
                      numberOfLines={1}
                    >
                      {p.tagline}
                    </Text>

                    {/* concept preview icons */}
                    <View style={styles.pathConceptStack}>
                      {p.conceptEmojis.slice(0, 4).map((e, i) => (
                        <View
                          key={i}
                          style={[
                            styles.pathConceptDot,
                            {
                              marginLeft: i === 0 ? 0 : -10,
                              zIndex: 5 - i,
                              backgroundColor: "#FFFFFF",
                            },
                          ]}
                        >
                          <MaterialDesignIcons
                            name={iconFromEmoji(e) as any}
                            size={16}
                            color={p.color}
                          />
                        </View>
                      ))}
                      <Text
                        style={[
                          styles.pathConceptMore,
                          p.color === "#FFC800"
                            ? { color: colors.onBrandSecondary }
                            : { color: "#FFFFFF" },
                        ]}
                      >
                        +{p.courses - p.conceptEmojis.length} more
                      </Text>
                    </View>

                    {/* progress footer */}
                    <View style={styles.pathFooter}>
                      <View style={{ flex: 1 }}>
                        <View
                          style={[
                            styles.pathProgressTrack,
                            {
                              backgroundColor:
                                p.color === "#FFC800"
                                  ? "rgba(74,58,0,0.2)"
                                  : "rgba(255,255,255,0.28)",
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.pathProgressFill,
                              {
                                width: `${Math.max(progress * 100, 4)}%`,
                                backgroundColor:
                                  p.color === "#FFC800"
                                    ? colors.onBrandSecondary
                                    : "#FFFFFF",
                              },
                            ]}
                          />
                        </View>
                        <Text
                          style={[
                            styles.pathProgressText,
                            p.color === "#FFC800"
                              ? { color: colors.onBrandSecondary }
                              : { color: "rgba(255,255,255,0.95)" },
                          ]}
                        >
                          {p.completed} of {p.courses} concepts mastered
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.pathCta,
                          {
                            backgroundColor:
                              p.color === "#FFC800"
                                ? colors.onBrandSecondary
                                : "#FFFFFF",
                          },
                        ]}
                      >
                        <Feather
                          name={p.completed > 0 ? "play" : "arrow-right"}
                          size={16}
                          color={
                            p.color === "#FFC800" ? "#FFC800" : p.color
                          }
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Trending Concepts */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <View style={styles.trendingHead}>
              <Text style={styles.trendingFlame}>🔥</Text>
              <Text style={styles.sectionTitle}>Trending this week</Text>
            </View>
            <Pressable>
              <Text style={styles.sectionAction}>See all</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendRow}
            snapToInterval={244}
            decelerationRate="fast"
          >
            {trending.map((c, idx) => (
              <Pressable
                key={c.id}
                style={styles.trendCard}
                testID={`trend-${c.id}`}
                onPress={() => router.push(`/concept/${c.id}`)}
              >
                <View style={styles.trendCover}>
                  <Image
                    source={{ uri: c.image }}
                    style={StyleSheet.absoluteFill}
                    contentFit="cover"
                    transition={200}
                  />
                  <LinearGradient
                    colors={[
                      "rgba(19,22,20,0.05)",
                      "rgba(19,22,20,0.35)",
                      "rgba(19,22,20,0.92)",
                    ]}
                    locations={[0, 0.5, 1]}
                    style={StyleSheet.absoluteFill}
                  />

                  {/* rank badge */}
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankNum}>#{idx + 1}</Text>
                  </View>

                  {/* trending stat */}
                  <View style={styles.learnersPill}>
                    <Feather name="trending-up" size={11} color={colors.onSurface} />
                    <Text style={styles.learnersText}>{trendingStats[idx]}</Text>
                  </View>

                  {/* emoji medallion */}
                  <View
                    style={[styles.trendEmojiBox, { backgroundColor: c.color }]}
                  >
                    <MaterialDesignIcons
                      name={iconFromEmoji(c.emoji) as any}
                      size={28}
                      color="#FFFFFF"
                    />
                  </View>

                  {/* content bottom */}
                  <View style={styles.trendContent}>
                    <View style={styles.trendSubjectRow}>
                      <View style={styles.trendSubjectPill}>
                        <Text style={styles.trendSubjectText}>{c.category}</Text>
                      </View>
                      <View style={styles.trendLevelPill}>
                        <Text style={styles.trendLevelText}>{c.level}</Text>
                      </View>
                    </View>
                    <Text style={styles.trendTitle} numberOfLines={2}>
                      {c.title}
                    </Text>
                    <View style={styles.trendMetaRow}>
                      <Feather name="clock" size={11} color="rgba(255,255,255,0.85)" />
                      <Text style={styles.trendMeta}>{c.duration}</Text>
                      <Text style={styles.trendMetaDot}>·</Text>
                      <Feather name="zap" size={11} color={colors.brandSecondary} />
                      <Text
                        style={[
                          styles.trendMeta,
                          { color: colors.brandSecondary, fontWeight: "700" },
                        ]}
                      >
                        {c.xp} XP
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
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

  // Paths — journey cards
  pathList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  pathCard: {
    borderRadius: radius.lg,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
      },
      android: { elevation: 4 },
    }),
  },
  pathGradient: {
    padding: spacing.lg,
    overflow: "hidden",
  },
  pathRingA: {
    position: "absolute",
    right: -60,
    top: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 40,
    borderColor: "rgba(255,255,255,0.08)",
  },
  pathRingB: {
    position: "absolute",
    right: -100,
    bottom: -100,
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 30,
    borderColor: "rgba(255,255,255,0.06)",
  },
  pathTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  pathKickerPill: {
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  pathKicker: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  pathEmojiMedallion: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  pathEmoji: { fontSize: 30 },
  pathTitleBig: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  pathTagline: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  pathConceptStack: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  pathConceptDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.9)",
  },
  pathConceptMore: {
    marginLeft: spacing.sm,
    fontSize: 11,
    fontWeight: "700",
  },
  pathFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  pathProgressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 6,
  },
  pathProgressFill: {
    height: 6,
    borderRadius: 3,
  },
  pathProgressText: {
    fontSize: 11,
    fontWeight: "700",
  },
  pathCta: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },

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

  // Trending — Netflix-style carousel
  trendingHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: spacing.md,
  },
  trendingFlame: { fontSize: 18, marginBottom: spacing.md },
  trendRow: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  trendCard: {
    width: 232,
    borderRadius: radius.lg,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: { elevation: 5 },
    }),
  },
  trendCover: {
    width: 232,
    height: 300,
    justifyContent: "flex-end",
    backgroundColor: colors.surfaceTertiary,
  },
  rankBadge: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    backgroundColor: "rgba(19,22,20,0.6)",
    paddingHorizontal: 10,
    height: 26,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  rankNum: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  learnersPill: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 10,
    height: 26,
    borderRadius: radius.pill,
  },
  learnersText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.onSurface,
  },
  trendEmojiBox: {
    position: "absolute",
    top: 56,
    right: spacing.md,
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  trendEmoji: { fontSize: 28 },
  trendContent: {
    padding: spacing.md,
    gap: 6,
  },
  trendSubjectRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: 2,
  },
  trendSubjectPill: {
    backgroundColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  trendSubjectText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.4,
  },
  trendLevelPill: {
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  trendLevelText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.onBrandSecondary,
    letterSpacing: 0.4,
  },
  trendTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  trendMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  trendMeta: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
  },
  trendMetaDot: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    marginHorizontal: 2,
  },
});

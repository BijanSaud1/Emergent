import React from "react";
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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";
import { ProgressBar } from "@/src/components/progress-bar";
import { courses, conceptContent } from "@/src/data/mock";

export default function ConceptDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const concept = courses.find((c) => c.id === id) ?? courses[0];
  const content = conceptContent[concept.id];

  const overview =
    content?.overview ??
    `${concept.title} is a fascinating concept in ${concept.category}. Dive in to explore the core ideas, real-world examples and mental models that make it click.`;
  const keyIdeas =
    content?.keyIdeas ?? [
      "Understand the core idea in plain language.",
      "See it come alive with real-world examples.",
      "Test yourself with a short quick-fire quiz.",
    ];
  const lessonCount = content?.lessons.length ?? concept.lessons;
  const quizCount = content?.quiz.length ?? 5;

  return (
    <View style={styles.container} testID="concept-detail">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 + insets.bottom }}
      >
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: concept.color }]}>
          <Image
            source={{ uri: concept.image }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(19,22,20,0.25)", "rgba(19,22,20,0.85)"]}
            style={StyleSheet.absoluteFill}
          />

          <View
            style={[
              styles.heroTop,
              { paddingTop: insets.top + spacing.md },
            ]}
          >
            <Pressable
              onPress={() => router.back()}
              style={styles.iconRound}
              testID="back-btn"
            >
              <Feather name="chevron-left" size={20} color={colors.onSurface} />
            </Pressable>
            <Pressable style={styles.iconRound} testID="bookmark-btn">
              <Feather name="bookmark" size={18} color={colors.onSurface} />
            </Pressable>
          </View>

          <View style={styles.heroBottom}>
            <View style={styles.subjectRow}>
              <View style={styles.subjectPill}>
                <Text style={styles.subjectText}>{concept.category}</Text>
              </View>
              <View style={styles.levelPillLight}>
                <Text style={styles.levelPillText}>{concept.level}</Text>
              </View>
            </View>
            <Text style={styles.heroEmoji}>{concept.emoji}</Text>
            <Text style={styles.heroTitle}>{concept.title}</Text>
            <Text style={styles.heroSubtitle}>{concept.subtitle}</Text>
          </View>
        </View>

        {/* Meta row */}
        <View style={styles.metaBar}>
          <MetaChip icon="layers" label={`${lessonCount} lessons`} />
          <MetaChip icon="clock" label={concept.duration} />
          <MetaChip icon="zap" label={`${concept.xp} XP`} tint />
        </View>

        {/* Progress if any */}
        {concept.progress > 0 && (
          <View style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Your progress</Text>
              <Text style={styles.progressPct}>
                {Math.round(concept.progress * 100)}%
              </Text>
            </View>
            <ProgressBar progress={concept.progress} height={10} />
          </View>
        )}

        {/* Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.body}>{overview}</Text>
        </View>

        {/* Key ideas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key ideas</Text>
          <View style={styles.keyList}>
            {keyIdeas.map((k, idx) => (
              <View key={idx} style={styles.keyRow}>
                <View
                  style={[
                    styles.keyDot,
                    { backgroundColor: concept.color + "22" },
                  ]}
                >
                  <Text style={[styles.keyDotText, { color: concept.color }]}>
                    {idx + 1}
                  </Text>
                </View>
                <Text style={styles.keyText}>{k}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* What's inside */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's inside</Text>
          <View style={styles.insideRow}>
            <View style={styles.insideCard}>
              <View
                style={[
                  styles.insideIcon,
                  { backgroundColor: colors.brandPrimary + "22" },
                ]}
              >
                <Feather name="book-open" size={18} color={colors.brandPrimary} />
              </View>
              <Text style={styles.insideValue}>{lessonCount}</Text>
              <Text style={styles.insideLabel}>Lesson cards</Text>
            </View>
            <View style={styles.insideCard}>
              <View
                style={[
                  styles.insideIcon,
                  { backgroundColor: colors.brandTertiary + "22" },
                ]}
              >
                <Feather name="target" size={18} color={colors.brandTertiary} />
              </View>
              <Text style={styles.insideValue}>{quizCount}</Text>
              <Text style={styles.insideLabel}>Quiz questions</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky bottom CTA */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <Pressable
          onPress={() => router.push(`/concept/${concept.id}/prove`)}
          style={[styles.proveBtn]}
          testID="prove-btn"
        >
          <Feather name="target" size={16} color={colors.onSurface} />
          <Text style={styles.proveText}>Prove it</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(`/concept/${concept.id}/learn`)}
          style={styles.learnBtn}
          testID="start-learn-btn"
        >
          <Text style={styles.learnText}>
            {concept.progress > 0 ? "Continue learning" : "Start learning"}
          </Text>
          <Feather name="arrow-right" size={16} color={colors.onBrandPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

function MetaChip({
  icon,
  label,
  tint,
}: {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  tint?: boolean;
}) {
  return (
    <View style={[styles.metaChip, tint && { backgroundColor: colors.brandSecondary }]}>
      <Feather
        name={icon}
        size={12}
        color={tint ? colors.onBrandSecondary : colors.onSurface}
      />
      <Text
        style={[
          styles.metaChipText,
          tint && { color: colors.onBrandSecondary },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  hero: {
    height: 320,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
  },
  iconRound: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroBottom: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  subjectRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  subjectPill: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  subjectText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  levelPillLight: {
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  levelPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onBrandSecondary,
  },
  heroEmoji: { fontSize: 40, marginBottom: 4 },
  heroTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.6,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "500",
  },

  metaBar: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    flexWrap: "wrap",
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 30,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceTertiary,
  },
  metaChipText: { fontSize: 12, fontWeight: "700", color: colors.onSurface },

  progressCard: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: { fontSize: 13, fontWeight: "600", color: colors.onSurface },
  progressPct: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.brandPrimary,
  },

  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.3,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurfaceSecondary,
    fontWeight: "500",
  },

  keyList: { gap: spacing.md },
  keyRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  keyDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  keyDotText: { fontSize: 13, fontWeight: "700" },
  keyText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.onSurface,
  },

  insideRow: { flexDirection: "row", gap: spacing.md },
  insideCard: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  insideIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  insideValue: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.4,
  },
  insideLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "500",
    marginTop: 2,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  proveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceTertiary,
  },
  proveText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
  },
  learnBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
  },
  learnText: {
    color: colors.onBrandPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
});

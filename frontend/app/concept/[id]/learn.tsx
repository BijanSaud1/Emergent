import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import Feather from "@react-native-vector-icons/feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";
import { courses, conceptContent, Lesson } from "@/src/data/mock";

const fallbackLessons: Lesson[] = [
  {
    id: "fl1",
    title: "The core idea",
    emoji: "💡",
    body: "Every concept has one line at its heart. Read it slowly. Say it back in your own words.",
    highlight: "One line, said in your own words.",
  },
  {
    id: "fl2",
    title: "See it in the wild",
    emoji: "🌍",
    body: "Concepts stick when we spot them in daily life. Try to find one example around you today.",
  },
  {
    id: "fl3",
    title: "Make it yours",
    emoji: "🧠",
    body: "Teach it to someone in one minute. If you can, you know it. If not, revisit and try again.",
  },
];

export default function LearnFlow() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const concept = courses.find((c) => c.id === id) ?? courses[0];
  const lessons = useMemo(
    () => conceptContent[concept.id]?.lessons ?? fallbackLessons,
    [concept.id],
  );

  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const lesson = lessons[step];
  const isLast = step === lessons.length - 1;

  const next = () => {
    if (isLast) {
      setCompleted(true);
      return;
    }
    setStep((s) => Math.min(s + 1, lessons.length - 1));
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  if (completed) {
    return (
      <View style={styles.container} testID="learn-complete">
        <View
          style={[
            styles.doneWrap,
            { paddingTop: insets.top + spacing.xl },
          ]}
        >
          <Text style={styles.doneEmoji}>🎉</Text>
          <Text style={styles.doneTitle}>Nice work!</Text>
          <Text style={styles.doneSubtitle}>
            You finished{" "}
            <Text style={{ color: colors.brandPrimary, fontWeight: "700" }}>
              {concept.title}
            </Text>
            . Ready to prove it?
          </Text>
          <View style={styles.rewardCard}>
            <View style={styles.rewardIcon}>
              <Feather name="zap" size={20} color={colors.onBrandSecondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rewardValue}>+{Math.round(concept.xp / 2)} XP</Text>
              <Text style={styles.rewardLabel}>Learning bonus earned</Text>
            </View>
          </View>

          <View style={styles.doneActions}>
            <Pressable
              style={styles.secondaryBtn}
              onPress={() => router.replace(`/concept/${concept.id}`)}
              testID="back-to-concept-btn"
            >
              <Text style={styles.secondaryText}>Back to concept</Text>
            </Pressable>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => router.replace(`/concept/${concept.id}/prove`)}
              testID="go-prove-btn"
            >
              <Text style={styles.primaryText}>Prove it</Text>
              <Feather name="target" size={16} color={colors.onBrandPrimary} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="learn-flow">
      {/* Top bar with progress dots */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.md }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.iconBtn}
          testID="close-learn-btn"
        >
          <Feather name="x" size={20} color={colors.onSurface} />
        </Pressable>
        <View style={styles.dots}>
          {lessons.map((_, idx) => {
            const state =
              idx < step ? "done" : idx === step ? "active" : "todo";
            return (
              <View
                key={idx}
                style={[
                  styles.dot,
                  state === "done" && styles.dotDone,
                  state === "active" && styles.dotActive,
                ]}
              />
            );
          })}
        </View>
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {step + 1}/{lessons.length}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: 120 + insets.bottom,
          paddingTop: spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.lessonEmojiBox, { backgroundColor: concept.color + "1A" }]}>
          <Text style={styles.lessonEmoji}>{lesson.emoji}</Text>
        </View>
        <Text style={styles.lessonKicker}>
          Lesson {step + 1} · {concept.title}
        </Text>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.lessonBody}>{lesson.body}</Text>

        {lesson.highlight && (
          <View
            style={[
              styles.highlightCard,
              { borderColor: concept.color, backgroundColor: concept.color + "10" },
            ]}
          >
            <Feather name="star" size={16} color={concept.color} />
            <Text style={[styles.highlightText, { color: colors.onSurface }]}>
              {lesson.highlight}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Sticky bottom nav */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <Pressable
          style={[styles.navBtn, step === 0 && styles.navBtnDisabled]}
          onPress={prev}
          disabled={step === 0}
          testID="prev-lesson-btn"
        >
          <Feather
            name="arrow-left"
            size={18}
            color={step === 0 ? colors.muted : colors.onSurface}
          />
        </Pressable>
        <Pressable
          style={styles.nextBtn}
          onPress={next}
          testID="next-lesson-btn"
        >
          <Text style={styles.nextText}>{isLast ? "Got it!" : "Next"}</Text>
          <Feather
            name={isLast ? "check" : "arrow-right"}
            size={18}
            color={colors.onBrandPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  dot: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceTertiary,
  },
  dotDone: { backgroundColor: colors.brandPrimary },
  dotActive: {
    backgroundColor: colors.brandPrimary,
  },
  counter: {
    paddingHorizontal: spacing.md,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: { fontSize: 12, fontWeight: "700", color: colors.onSurface },

  lessonEmojiBox: {
    width: 88,
    height: 88,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  lessonEmoji: { fontSize: 44 },
  lessonKicker: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.brandPrimary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  lessonTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.5,
    marginBottom: spacing.md,
  },
  lessonBody: {
    fontSize: 16,
    lineHeight: 25,
    color: colors.onSurfaceSecondary,
    fontWeight: "500",
  },
  highlightCard: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  highlightText: { flex: 1, fontSize: 14, fontWeight: "700", lineHeight: 20 },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  navBtn: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnDisabled: { opacity: 0.4 },
  nextBtn: {
    flex: 1,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
    ...Platform.select({
      ios: {
        shadowColor: colors.brandPrimary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: { elevation: 4 },
    }),
  },
  nextText: {
    color: colors.onBrandPrimary,
    fontSize: 16,
    fontWeight: "700",
  },

  // Done state
  doneWrap: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  doneEmoji: { fontSize: 72, marginBottom: spacing.md },
  doneTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  doneSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: spacing.lg,
  },
  rewardCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
  },
  rewardIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.brandSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
  },
  rewardLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "500",
    marginTop: 2,
  },
  doneActions: {
    flexDirection: "row",
    gap: spacing.md,
    width: "100%",
    marginTop: spacing.md,
  },
  secondaryBtn: {
    flex: 1,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: { fontSize: 14, fontWeight: "700", color: colors.onSurface },
  primaryBtn: {
    flex: 1,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  primaryText: { fontSize: 14, fontWeight: "700", color: colors.onBrandPrimary },
});

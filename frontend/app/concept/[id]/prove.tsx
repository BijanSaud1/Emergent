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
import { courses, conceptContent, QuizQuestion } from "@/src/data/mock";

const fallbackQuiz: QuizQuestion[] = [
  {
    id: "fq1",
    prompt: "The best way to remember a concept is…",
    options: [
      { id: "a", text: "Read it once and move on", correct: false },
      { id: "b", text: "Explain it in your own words", correct: true },
      { id: "c", text: "Memorize every sentence", correct: false },
    ],
    explanation:
      "Active recall — explaining an idea back — is one of the strongest known learning techniques.",
  },
  {
    id: "fq2",
    prompt: "Which habit strengthens learning most?",
    options: [
      { id: "a", text: "Cramming once a month", correct: false },
      { id: "b", text: "Short daily practice", correct: true },
      { id: "c", text: "Watching passive videos only", correct: false },
    ],
    explanation:
      "Spaced daily practice consistently beats infrequent cram sessions.",
  },
];

export default function ProveFlow() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const concept = courses.find((c) => c.id === id) ?? courses[0];
  const questions = useMemo(
    () => conceptContent[concept.id]?.quiz ?? fallbackQuiz,
    [concept.id],
  );

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[step];
  const isLast = step === questions.length - 1;

  const pick = (optId: string) => {
    if (locked) return;
    setSelected(optId);
    setLocked(true);
    const opt = q.options.find((o) => o.id === optId);
    if (opt?.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
    setLocked(false);
  };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= 60;
    const earned = passed ? concept.xp : Math.round(concept.xp / 3);

    return (
      <View style={styles.container} testID="prove-complete">
        <View style={[styles.doneWrap, { paddingTop: insets.top + spacing.xl }]}>
          <Text style={styles.doneEmoji}>{passed ? "🏆" : "💪"}</Text>
          <Text style={styles.doneTitle}>
            {passed ? "You proved it!" : "Almost there"}
          </Text>
          <Text style={styles.doneSubtitle}>
            You scored{" "}
            <Text style={{ color: colors.brandPrimary, fontWeight: "700" }}>
              {score}/{questions.length}
            </Text>{" "}
            on {concept.title}.
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{percent}%</Text>
              <Text style={styles.statLabel}>Score</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.brandPrimary }]}>
                +{earned}
              </Text>
              <Text style={styles.statLabel}>XP earned</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
          </View>

          <View style={styles.doneActions}>
            <Pressable
              style={styles.secondaryBtn}
              onPress={() => {
                setStep(0);
                setSelected(null);
                setLocked(false);
                setScore(0);
                setFinished(false);
              }}
              testID="retry-quiz-btn"
            >
              <Feather name="rotate-cw" size={16} color={colors.onSurface} />
              <Text style={styles.secondaryText}>Try again</Text>
            </Pressable>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => router.replace(`/concept/${concept.id}`)}
              testID="finish-quiz-btn"
            >
              <Text style={styles.primaryText}>Done</Text>
              <Feather name="check" size={16} color={colors.onBrandPrimary} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const correctOptId = q.options.find((o) => o.correct)?.id;

  return (
    <View style={styles.container} testID="prove-flow">
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.md }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.iconBtn}
          testID="close-quiz-btn"
        >
          <Feather name="x" size={20} color={colors.onSurface} />
        </Pressable>
        <View style={styles.dots}>
          {questions.map((_, idx) => {
            const state = idx < step ? "done" : idx === step ? "active" : "todo";
            return (
              <View
                key={idx}
                style={[
                  styles.dot,
                  state === "done" && { backgroundColor: colors.brandPrimary },
                  state === "active" && { backgroundColor: colors.brandPrimary },
                ]}
              />
            );
          })}
        </View>
        <View style={styles.xpTag}>
          <Feather name="zap" size={12} color={colors.onBrandSecondary} />
          <Text style={styles.xpText}>{score}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xl,
          paddingBottom: 120 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>
          Question {step + 1} of {questions.length}
        </Text>
        <Text style={styles.prompt}>{q.prompt}</Text>

        <View style={styles.optionsList}>
          {q.options.map((o) => {
            const isSelected = selected === o.id;
            const isCorrect = o.correct;
            let border = colors.border;
            let bg = colors.surfaceSecondary;
            let icon: React.ComponentProps<typeof Feather>["name"] | null = null;
            let iconColor = colors.onSurface;

            if (locked) {
              if (isCorrect) {
                border = colors.success;
                bg = colors.success + "12";
                icon = "check-circle";
                iconColor = colors.success;
              } else if (isSelected && !isCorrect) {
                border = colors.error;
                bg = colors.error + "10";
                icon = "x-circle";
                iconColor = colors.error;
              }
            } else if (isSelected) {
              border = colors.brandPrimary;
              bg = colors.brandPrimary + "10";
            }

            return (
              <Pressable
                key={o.id}
                onPress={() => pick(o.id)}
                style={[
                  styles.option,
                  { borderColor: border, backgroundColor: bg },
                ]}
                testID={`option-${o.id}`}
              >
                <Text style={styles.optionText}>{o.text}</Text>
                {icon && (
                  <Feather name={icon} size={20} color={iconColor} />
                )}
              </Pressable>
            );
          })}
        </View>

        {locked && (
          <View
            style={[
              styles.explainCard,
              {
                borderColor:
                  selected === correctOptId ? colors.success : colors.brandTertiary,
                backgroundColor:
                  (selected === correctOptId
                    ? colors.success
                    : colors.brandTertiary) + "12",
              },
            ]}
          >
            <Text
              style={[
                styles.explainKicker,
                {
                  color:
                    selected === correctOptId
                      ? colors.success
                      : colors.brandTertiary,
                },
              ]}
            >
              {selected === correctOptId ? "Correct!" : "Not quite"}
            </Text>
            <Text style={styles.explainText}>{q.explanation}</Text>
          </View>
        )}
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
        ]}
      >
        <Pressable
          style={[styles.nextBtn, !locked && styles.nextDisabled]}
          onPress={next}
          disabled={!locked}
          testID="next-question-btn"
        >
          <Text style={styles.nextText}>
            {isLast ? "See results" : "Next question"}
          </Text>
          <Feather name="arrow-right" size={18} color={colors.onBrandPrimary} />
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
  dots: { flex: 1, flexDirection: "row", gap: 4 },
  dot: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceTertiary,
  },
  xpTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.md,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.brandSecondary,
  },
  xpText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.onBrandSecondary,
  },

  kicker: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.brandPrimary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  prompt: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.4,
    lineHeight: 30,
    marginBottom: spacing.xl,
  },
  optionsList: { gap: spacing.md },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    minHeight: 60,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.onSurface,
    lineHeight: 20,
    marginRight: spacing.sm,
  },

  explainCard: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
  },
  explainKicker: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  explainText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurface,
    fontWeight: "500",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  nextBtn: {
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
  nextDisabled: { opacity: 0.35 },
  nextText: {
    color: colors.onBrandPrimary,
    fontSize: 16,
    fontWeight: "700",
  },

  // Complete
  doneWrap: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  doneEmoji: { fontSize: 72, marginBottom: spacing.md },
  doneTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.5,
    marginBottom: spacing.sm,
  },
  doneSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: spacing.xl,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
    width: "100%",
  },
  statBox: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: "600",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  doneActions: {
    flexDirection: "row",
    gap: spacing.md,
    width: "100%",
    marginTop: spacing.xl,
  },
  secondaryBtn: {
    flex: 1,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
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

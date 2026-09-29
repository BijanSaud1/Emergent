import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Platform,
} from "react-native";
import Feather from "@react-native-vector-icons/feather";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radius, spacing } from "@/src/theme";

type Props = {
  visible: boolean;
  streak: number;
  onClose: () => void;
};

const plans = [
  {
    id: "monthly",
    label: "Monthly",
    price: "$4.99",
    subtitle: "billed monthly",
    highlight: false,
  },
  {
    id: "annual",
    label: "Annual",
    price: "$29.99",
    subtitle: "$2.49 / month · save 50%",
    highlight: true,
  },
];

export function StreakFreezeModal({ visible, streak, onClose }: Props) {
  const [plan, setPlan] = useState("annual");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet} testID="streak-freeze-modal">
          <LinearGradient
            colors={["#FFC800", "#FF9900"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <Pressable
              onPress={onClose}
              style={styles.close}
              testID="close-freeze-modal"
            >
              <Feather name="x" size={18} color={colors.onSurface} />
            </Pressable>
            <View style={styles.flameWrap}>
              <MaterialDesignIcons
                name="snowflake"
                size={40}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.heroTitle}>Protect your {streak}-day streak</Text>
            <Text style={styles.heroSubtitle}>
              Streak Freeze auto-saves your progress on days you can't practice
            </Text>
          </LinearGradient>

          <View style={styles.body}>
            <View style={styles.perks}>
              {[
                { icon: "shield" as const, text: "3 auto-freezes every month" },
                { icon: "book-open" as const, text: "Unlimited concept access" },
                { icon: "target" as const, text: "Bonus quizzes & explanations" },
                { icon: "trending-up" as const, text: "Double XP weekends" },
              ].map((p, idx) => (
                <View key={idx} style={styles.perkRow}>
                  <View style={styles.perkIcon}>
                    <Feather name={p.icon} size={14} color={colors.brandPrimary} />
                  </View>
                  <Text style={styles.perkText}>{p.text}</Text>
                </View>
              ))}
            </View>

            <View style={styles.plans}>
              {plans.map((p) => {
                const selected = plan === p.id;
                return (
                  <Pressable
                    key={p.id}
                    onPress={() => setPlan(p.id)}
                    style={[
                      styles.planCard,
                      selected && styles.planCardActive,
                    ]}
                    testID={`plan-${p.id}`}
                  >
                    {p.highlight && (
                      <View style={styles.bestPill}>
                        <Text style={styles.bestText}>BEST VALUE</Text>
                      </View>
                    )}
                    <View style={styles.radio}>
                      {selected && <View style={styles.radioDot} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.planLabel}>{p.label}</Text>
                      <Text style={styles.planSub}>{p.subtitle}</Text>
                    </View>
                    <Text style={styles.planPrice}>{p.price}</Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              style={styles.cta}
              onPress={onClose}
              testID="start-trial-btn"
            >
              <Text style={styles.ctaText}>Start 7-day free trial</Text>
            </Pressable>
            <Pressable onPress={onClose} testID="skip-btn">
              <Text style={styles.skip}>Not now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(19,22,20,0.55)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
  },
  hero: {
    padding: spacing.xl,
    alignItems: "center",
  },
  close: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  flameWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.28)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.55)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.4,
    textAlign: "center",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: colors.onSurface,
    opacity: 0.8,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 18,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  perks: { gap: 10 },
  perkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  perkIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.brandPrimary + "22",
    alignItems: "center",
    justifyContent: "center",
  },
  perkText: { fontSize: 14, color: colors.onSurface, fontWeight: "600" },

  plans: { gap: spacing.sm, marginTop: spacing.sm },
  planCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSecondary,
    position: "relative",
  },
  planCardActive: {
    borderColor: colors.brandPrimary,
    backgroundColor: colors.brandPrimary + "0F",
  },
  bestPill: {
    position: "absolute",
    top: -10,
    right: spacing.md,
    backgroundColor: colors.brandTertiary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  bestText: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.onBrandTertiary,
    letterSpacing: 0.5,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brandPrimary,
  },
  planLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
  },
  planSub: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "500",
    marginTop: 2,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.onSurface,
  },

  cta: {
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: colors.brandPrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: { elevation: 3 },
    }),
  },
  ctaText: {
    color: colors.onBrandPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  skip: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    fontWeight: "600",
    marginTop: spacing.sm,
  },
});

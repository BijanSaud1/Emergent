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
import Feather from "@react-native-vector-icons/feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";
import { usesNativeTabs } from "@/src/navigation";
import { ProgressBar } from "@/src/components/progress-bar";
import { user, badges } from "@/src/data/mock";

const settings = [
  { id: "notif", label: "Notifications", icon: "bell" as const },
  { id: "goals", label: "Learning goals", icon: "target" as const },
  { id: "sub", label: "Subscription", icon: "credit-card" as const },
  { id: "help", label: "Help & support", icon: "help-circle" as const },
  { id: "signout", label: "Sign out", icon: "log-out" as const, danger: true },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;
  const scrollPadBottom = spacing.xxl;

  const levelProgress = user.xp / user.nextLevelXp;

  return (
    <View style={styles.container} testID="profile-screen">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.md,
          paddingBottom: scrollPadBottom + bottomChrome,
        }}
      >
        {/* Header actions */}
        <View style={styles.topBar}>
          <Text style={styles.topTitle}>Profile</Text>
          <Pressable style={styles.iconBtn} testID="settings-btn">
            <Feather name="settings" size={18} color={colors.onSurface} />
          </Pressable>
        </View>

        {/* Avatar block */}
        <View style={styles.avatarBlock}>
          <View style={styles.avatarRing}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.levelChip}>
              <Text style={styles.levelChipText}>Lv {user.level}</Text>
            </View>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.handle}>{user.handle}</Text>

          <View style={styles.xpBar}>
            <View style={styles.xpBarLabel}>
              <Text style={styles.xpBarText}>
                {user.xp} / {user.nextLevelXp} XP
              </Text>
              <Text style={[styles.xpBarText, { color: colors.brandPrimary }]}>
                Level {user.level + 1}
              </Text>
            </View>
            <ProgressBar progress={levelProgress} height={10} />
          </View>
        </View>

        {/* Stats 2x2 */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="zap"
            iconColor={colors.brandSecondary}
            iconBg={colors.brandSecondary + "22"}
            label="Day Streak"
            value={String(user.streak)}
          />
          <StatCard
            icon="award"
            iconColor={colors.brandPrimary}
            iconBg={colors.brandPrimary + "22"}
            label="Total XP"
            value={user.xp.toLocaleString()}
          />
          <StatCard
            icon="book-open"
            iconColor={colors.brandTertiary}
            iconBg={colors.brandTertiary + "22"}
            label="Courses"
            value={String(user.coursesCompleted)}
          />
          <StatCard
            icon="trending-up"
            iconColor={colors.onSurface}
            iconBg={colors.surfaceTertiary}
            label="Global Rank"
            value={`#${user.rank}`}
          />
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <Text style={styles.sectionMeta}>
              {badges.filter((b) => b.earned).length}/{badges.length}
            </Text>
          </View>
          <View style={styles.badgeGrid}>
            {badges.map((b) => (
              <View
                key={b.id}
                style={styles.badgeItem}
                testID={`badge-${b.id}`}
              >
                <View
                  style={[
                    styles.badgeCircle,
                    {
                      backgroundColor: b.earned
                        ? b.color + "22"
                        : colors.surfaceTertiary,
                      borderColor: b.earned ? b.color : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeEmoji,
                      !b.earned && { opacity: 0.35 },
                    ]}
                  >
                    {b.emoji}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.badgeLabel,
                    !b.earned && { color: colors.muted },
                  ]}
                  numberOfLines={1}
                >
                  {b.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            {settings.map((s, idx) => (
              <Pressable
                key={s.id}
                style={[
                  styles.settingRow,
                  idx < settings.length - 1 && styles.settingDivider,
                ]}
                testID={`setting-${s.id}`}
              >
                <View
                  style={[
                    styles.settingIcon,
                    s.danger && { backgroundColor: colors.error + "1A" },
                  ]}
                >
                  <Feather
                    name={s.icon}
                    size={16}
                    color={s.danger ? colors.error : colors.onSurface}
                  />
                </View>
                <Text
                  style={[
                    styles.settingLabel,
                    s.danger && { color: colors.error },
                  ]}
                >
                  {s.label}
                </Text>
                <Feather name="chevron-right" size={18} color={colors.muted} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({
  icon,
  iconColor,
  iconBg,
  label,
  value,
}: {
  icon: React.ComponentProps<typeof Feather>["name"];
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statCard} testID={`stat-${label}`}>
      <View style={[styles.statIcon, { backgroundColor: iconBg }]}>
        <Feather name={icon} size={16} color={iconColor} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  topTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.4,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBlock: { alignItems: "center", paddingHorizontal: spacing.lg },
  avatarRing: {
    width: 108,
    height: 108,
    borderRadius: 54,
    padding: 4,
    borderWidth: 3,
    borderColor: colors.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  levelChip: {
    position: "absolute",
    bottom: -4,
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  levelChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onBrandSecondary,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.4,
  },
  handle: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.muted,
    marginTop: 2,
  },
  xpBar: { width: "100%", marginTop: spacing.lg, gap: 6 },
  xpBarLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  xpBarText: { fontSize: 12, fontWeight: "600", color: colors.onSurface },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  statCard: {
    width: "48%",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "500",
    marginTop: 2,
  },

  section: { marginTop: spacing.xl, paddingHorizontal: spacing.lg },
  sectionRow: {
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
  sectionMeta: {
    fontSize: 13,
    color: colors.brandPrimary,
    fontWeight: "700",
    marginBottom: spacing.md,
  },

  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  badgeItem: { width: "30%", alignItems: "center" },
  badgeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  badgeEmoji: { fontSize: 28 },
  badgeLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.onSurface,
    textAlign: "center",
  },

  settingsCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
    }),
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  settingDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.onSurface,
  },
});

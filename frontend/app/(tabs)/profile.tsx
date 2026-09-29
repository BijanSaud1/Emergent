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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";
import { usesNativeTabs } from "@/src/navigation";
import { iconFromEmoji } from "@/src/components/concept-icon";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  user,
  badges,
  weeklyActivity,
  favoriteSubjects,
  recentlyMastered,
} from "@/src/data/mock";

const settings = [
  { id: "notif", label: "Notifications", icon: "bell" as const },
  { id: "goals", label: "Learning goals", icon: "target" as const },
  { id: "sub", label: "Subscription", icon: "credit-card" as const },
  { id: "help", label: "Help & support", icon: "help-circle" as const },
  { id: "signout", label: "Sign out", icon: "log-out" as const, danger: true },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;
  const scrollPadBottom = spacing.xxl;

  const levelProgress = user.xp / user.nextLevelXp;
  const maxMinutes = Math.max(...weeklyActivity.map((d) => d.minutes));

  return (
    <View style={styles.container} testID="profile-screen">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scrollPadBottom + bottomChrome,
        }}
      >
        {/* Gradient hero */}
        <LinearGradient
          colors={["#04B077", "#FFC800"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + spacing.md }]}
        >
          <View style={styles.heroTopBar}>
            <Pressable style={styles.iconBtn} testID="share-btn">
              <Feather name="share-2" size={16} color={colors.onSurface} />
            </Pressable>
            <Pressable style={styles.iconBtn} testID="settings-btn">
              <Feather name="settings" size={16} color={colors.onSurface} />
            </Pressable>
          </View>

          <View style={styles.heroContent}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatarRing}>
                <Image
                  source={{ uri: user.avatar }}
                  style={styles.avatar}
                  contentFit="cover"
                  transition={200}
                />
              </View>
              <View style={styles.levelChip}>
                <Feather name="zap" size={11} color={colors.onBrandSecondary} />
                <Text style={styles.levelChipText}>Lv {user.level}</Text>
              </View>
            </View>

            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.handle}>{user.handle}</Text>
            <Text style={styles.bio} numberOfLines={2}>
              {user.bio}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Feather name="map-pin" size={11} color="#FFFFFF" />
                <Text style={styles.metaText}>{user.location}</Text>
              </View>
              <Text style={styles.metaDot}>·</Text>
              <View style={styles.metaItem}>
                <Feather name="calendar" size={11} color="#FFFFFF" />
                <Text style={styles.metaText}>Joined {user.joined}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Floating level card overlapping hero */}
        <View style={styles.levelCardWrap}>
          <View style={styles.levelCard} testID="level-card">
            <View style={styles.levelRow}>
              <View>
                <Text style={styles.levelKicker}>LEVEL {user.level}</Text>
                <Text style={styles.levelTitle}>Curious Thinker</Text>
              </View>
              <View style={styles.nextLevelPill}>
                <Text style={styles.nextLevelText}>
                  Level {user.level + 1}
                </Text>
              </View>
            </View>
            <View style={styles.levelBarTrack}>
              <LinearGradient
                colors={[colors.brandPrimary, "#02C58A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.levelBarFill,
                  { width: `${levelProgress * 100}%` },
                ]}
              />
            </View>
            <View style={styles.levelBarLabel}>
              <Text style={styles.levelBarText}>
                {user.xp.toLocaleString()} XP
              </Text>
              <Text style={styles.levelBarMuted}>
                {(user.nextLevelXp - user.xp).toLocaleString()} XP to next level
              </Text>
            </View>
          </View>
        </View>

        {/* Compact stat strip */}
        <View style={styles.statStrip} testID="stats-strip">
          <StatMini
            icon="fire"
            iconColor={colors.brandTertiary}
            value={String(user.streak)}
            label="Streak"
            tint={colors.brandTertiary + "18"}
          />
          <View style={styles.statDivider} />
          <StatMini
            icon="star-four-points"
            iconColor={colors.brandSecondary}
            value={user.xp.toLocaleString()}
            label="Total XP"
            tint={colors.brandSecondary + "22"}
          />
          <View style={styles.statDivider} />
          <StatMini
            icon="book-open-variant"
            iconColor={colors.brandPrimary}
            value={String(user.coursesCompleted)}
            label="Learned"
            tint={colors.brandPrimary + "18"}
          />
          <View style={styles.statDivider} />
          <StatMini
            icon="medal"
            iconColor={colors.onSurface}
            value={`#${user.rank}`}
            label="Rank"
            tint={colors.surfaceTertiary}
          />
        </View>

        {/* Weekly activity chart */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>This week</Text>
            <View style={styles.minutesPill}>
              <Feather name="clock" size={11} color={colors.brandPrimary} />
              <Text style={styles.minutesText}>{user.minutesWeek} min</Text>
            </View>
          </View>
          <View style={styles.chartCard} testID="weekly-chart">
            <View style={styles.chart}>
              {weeklyActivity.map((d, idx) => {
                const h = Math.max(6, (d.minutes / maxMinutes) * 96);
                const isToday = !!d.isToday;
                return (
                  <View key={idx} style={styles.chartCol}>
                    <View style={styles.chartBarWrap}>
                      {isToday ? (
                        <LinearGradient
                          colors={[colors.brandPrimary, "#02C58A"]}
                          style={[styles.chartBar, { height: h }]}
                        />
                      ) : (
                        <View
                          style={[
                            styles.chartBar,
                            {
                              height: h,
                              backgroundColor: colors.brandPrimary + "33",
                            },
                          ]}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.chartDay,
                        isToday && { color: colors.brandPrimary, fontWeight: "700" },
                      ]}
                    >
                      {d.day}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.chartFooter}>
              <View>
                <Text style={styles.chartFooterValue}>
                  {user.minutesToday} min
                </Text>
                <Text style={styles.chartFooterLabel}>Today</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.chartFooterValue}>
                  {user.longestStreak} days
                </Text>
                <Text style={styles.chartFooterLabel}>Longest streak</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Favorite subjects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorite subjects</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subjectsRow}
          >
            {favoriteSubjects.map((s) => (
              <View
                key={s.id}
                style={[
                  styles.subjectPill,
                  { backgroundColor: s.color + "18", borderColor: s.color + "55" },
                ]}
                testID={`subject-${s.id}`}
              >
                <MaterialDesignIcons
                  name={iconFromEmoji(s.emoji) as any}
                  size={16}
                  color={s.color}
                />
                <Text style={styles.subjectLabel}>{s.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recently mastered */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Recently mastered</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          <View style={styles.masteredList}>
            {recentlyMastered.map((m) => (
              <Pressable
                key={m.id}
                onPress={() => router.push(`/concept/${m.id}`)}
                style={styles.masteredRow}
                testID={`mastered-${m.id}`}
              >
                <View
                  style={[
                    styles.masteredEmoji,
                    { backgroundColor: m.color + "22" },
                  ]}
                >
                  <MaterialDesignIcons
                    name={iconFromEmoji(m.emoji) as any}
                    size={22}
                    color={m.color}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.masteredTitle}>{m.title}</Text>
                  <Text style={styles.masteredSub}>
                    {m.subject} · {m.daysAgo}
                  </Text>
                </View>
                <View style={styles.doneCheck}>
                  <Feather name="check" size={14} color={colors.onSuccess} />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.badgesCount}>
              <Feather name="award" size={11} color={colors.brandPrimary} />
              <Text style={styles.badgesCountText}>
                {badges.filter((b) => b.earned).length} of {badges.length}
              </Text>
            </View>
          </View>

          {/* Latest achievement featured card */}
          {(() => {
            const latest = [...badges]
              .filter((b) => b.earned)
              .slice(-1)[0];
            if (!latest) return null;
            return (
              <View style={styles.latestCard} testID="latest-badge">
                <LinearGradient
                  colors={[latest.color, latest.color + "CC"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.latestGradient}
                >
                  <View style={styles.latestBurst}>
                    {[...Array(8)].map((_, i) => (
                      <View
                        key={i}
                        style={[
                          styles.burstRay,
                          { transform: [{ rotate: `${i * 45}deg` }] },
                        ]}
                      />
                    ))}
                  </View>

                  <View style={styles.latestInfo}>
                    <View style={styles.latestKickerRow}>
                      <Feather name="star" size={11} color="#FFFFFF" />
                      <Text style={styles.latestKicker}>NEWEST · {latest.tier.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.latestName}>{latest.name}</Text>
                    <Text style={styles.latestDesc} numberOfLines={2}>
                      {latest.description}
                    </Text>
                    <View style={styles.latestFooter}>
                      <Feather name="calendar" size={11} color="rgba(255,255,255,0.85)" />
                      <Text style={styles.latestDate}>Earned {latest.earnedOn}</Text>
                    </View>
                  </View>

                  <View style={styles.latestEmojiWrap}>
                    <MaterialDesignIcons
                      name={iconFromEmoji(latest.emoji) as any}
                      size={48}
                      color="#FFFFFF"
                    />
                  </View>
                </LinearGradient>
              </View>
            );
          })()}

          {/* Earned trophy shelf */}
          <Text style={styles.subheader}>Trophy shelf</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shelfRow}
          >
            {badges
              .filter((b) => b.earned)
              .map((b) => (
                <View key={b.id} style={styles.trophyCard} testID={`trophy-${b.id}`}>
                  <View
                    style={[
                      styles.trophyCircle,
                      {
                        borderColor: b.color,
                        backgroundColor: b.color + "18",
                      },
                    ]}
                  >
                    <View
                      style={[styles.trophyInner, { backgroundColor: b.color }]}
                    >
                      <MaterialDesignIcons
                        name={iconFromEmoji(b.emoji) as any}
                        size={26}
                        color="#FFFFFF"
                      />
                    </View>
                  </View>
                  <Text style={styles.trophyName} numberOfLines={1}>
                    {b.name}
                  </Text>
                  <View
                    style={[
                      styles.tierPill,
                      { backgroundColor: tierColor(b.tier) + "22" },
                    ]}
                  >
                    <Text style={[styles.tierText, { color: tierColor(b.tier) }]}>
                      {b.tier}
                    </Text>
                  </View>
                </View>
              ))}
          </ScrollView>

          {/* In-progress badges */}
          <Text style={styles.subheader}>In progress</Text>
          <View style={styles.progressList}>
            {badges
              .filter((b) => !b.earned)
              .map((b) => (
                <View
                  key={b.id}
                  style={styles.progressCard}
                  testID={`progress-badge-${b.id}`}
                >
                  <View
                    style={[
                      styles.progressEmojiBox,
                      { backgroundColor: colors.surfaceTertiary },
                    ]}
                  >
                    <MaterialDesignIcons
                      name={iconFromEmoji(b.emoji) as any}
                      size={26}
                      color={colors.muted}
                    />
                    <View style={styles.lockPill}>
                      <Feather name="lock" size={10} color={colors.muted} />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.progressTopRow}>
                      <Text style={styles.progressName} numberOfLines={1}>
                        {b.name}
                      </Text>
                      <View
                        style={[
                          styles.tierPill,
                          {
                            backgroundColor: tierColor(b.tier) + "22",
                            marginLeft: spacing.sm,
                          },
                        ]}
                      >
                        <Text
                          style={[styles.tierText, { color: tierColor(b.tier) }]}
                        >
                          {b.tier}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.progressDesc} numberOfLines={1}>
                      {b.description}
                    </Text>
                    <View style={styles.progressBarTrack}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${(b.progress ?? 0) * 100}%`,
                            backgroundColor: b.color,
                          },
                        ]}
                      />
                    </View>
                    <View style={styles.progressBottomRow}>
                      <Text style={styles.progressReq}>{b.requirement}</Text>
                      <Text style={[styles.progressPct, { color: b.color }]}>
                        {Math.round((b.progress ?? 0) * 100)}%
                      </Text>
                    </View>
                  </View>
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

function tierColor(tier: "Common" | "Rare" | "Epic" | "Legendary") {
  switch (tier) {
    case "Common":
      return colors.muted;
    case "Rare":
      return colors.brandPrimary;
    case "Epic":
      return colors.brandTertiary;
    case "Legendary":
      return "#FF9900";
  }
}

function StatMini({
  icon,
  iconColor,
  value,
  label,
  tint,
}: {
  icon: string;
  iconColor: string;
  value: string;
  label: string;
  tint: string;
}) {
  return (
    <View style={styles.statMini}>
      <View style={[styles.statMiniIcon, { backgroundColor: tint }]}>
        <MaterialDesignIcons name={icon as any} size={17} color={iconColor} />
      </View>
      <Text style={styles.statMiniValue}>{value}</Text>
      <Text style={styles.statMiniLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },

  // Hero gradient
  hero: {
    paddingBottom: 88, // leaves room for overlapping level card
    paddingHorizontal: spacing.lg,
  },
  heroTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroContent: { alignItems: "center" },
  avatarWrap: {
    marginBottom: spacing.md,
  },
  avatarRing: {
    width: 112,
    height: 112,
    borderRadius: 56,
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  levelChip: {
    position: "absolute",
    bottom: -6,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  levelChipText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.onBrandSecondary,
    letterSpacing: 0.3,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.4,
    marginTop: spacing.md,
  },
  handle: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
  },
  bio: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginTop: spacing.md,
    lineHeight: 19,
    paddingHorizontal: spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.md,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  metaDot: { color: "#FFFFFF", opacity: 0.7 },

  // Floating level card
  levelCardWrap: {
    paddingHorizontal: spacing.lg,
    marginTop: -68,
  },
  levelCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
      android: { elevation: 4 },
    }),
  },
  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  levelKicker: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.brandPrimary,
    letterSpacing: 0.5,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  nextLevelPill: {
    backgroundColor: colors.surfaceTertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  nextLevelText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.onSurface,
  },
  levelBarTrack: {
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.surfaceTertiary,
    overflow: "hidden",
  },
  levelBarFill: {
    height: 12,
    borderRadius: 6,
  },
  levelBarLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  levelBarText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.onSurface,
  },
  levelBarMuted: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.muted,
  },

  // Stat strip
  statStrip: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statMini: { flex: 1, alignItems: "center" },
  statMiniIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  statMiniValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  statMiniLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.muted,
    marginTop: 2,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 40,
    backgroundColor: colors.border,
  },

  // Section basics
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
  seeAll: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.brandPrimary,
    marginBottom: spacing.md,
  },
  minutesPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.md,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary + "18",
    marginBottom: spacing.md,
  },
  minutesText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.brandPrimary,
  },

  // Chart
  chartCard: {
    padding: spacing.lg,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chart: {
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: spacing.md,
  },
  chartCol: { alignItems: "center", flex: 1 },
  chartBarWrap: {
    width: 22,
    height: 100,
    justifyContent: "flex-end",
    marginBottom: 6,
  },
  chartBar: {
    width: 22,
    borderRadius: 6,
    minHeight: 6,
  },
  chartDay: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.muted,
  },
  chartFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  chartFooterValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
  },
  chartFooterLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.muted,
    marginTop: 2,
  },

  // Subjects
  subjectsRow: { gap: spacing.sm, paddingRight: spacing.lg },
  subjectPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md,
    height: 40,
    borderRadius: radius.pill,
    borderWidth: 1.5,
  },
  subjectEmoji: { fontSize: 16 },
  subjectLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.onSurface,
  },

  // Mastered
  masteredList: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  masteredRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  masteredEmoji: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  masteredEmojiText: { fontSize: 22 },
  masteredTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
  },
  masteredSub: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.muted,
    marginTop: 2,
  },
  doneCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },

  // Badges — new showcase
  badgesCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.brandPrimary + "18",
    paddingHorizontal: spacing.md,
    height: 26,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  badgesCountText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.brandPrimary,
  },

  subheader: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },

  // Latest featured card
  latestCard: {
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
  latestGradient: {
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    overflow: "hidden",
  },
  latestBurst: {
    position: "absolute",
    right: -30,
    top: "50%",
    width: 260,
    height: 260,
    marginTop: -130,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.35,
  },
  burstRay: {
    position: "absolute",
    width: 2,
    height: 260,
    backgroundColor: "#FFFFFF",
    opacity: 0.4,
  },
  latestInfo: { flex: 1, zIndex: 1 },
  latestKickerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  latestKicker: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.8,
  },
  latestName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  latestDesc: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255,255,255,0.9)",
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  latestFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  latestDate: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
  },
  latestEmojiWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.55)",
  },
  latestEmoji: { fontSize: 48 },

  // Trophy shelf
  shelfRow: {
    gap: spacing.md,
    paddingRight: spacing.lg,
    paddingVertical: spacing.sm,
  },
  trophyCard: {
    width: 108,
    alignItems: "center",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  trophyCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
    padding: 4,
  },
  trophyInner: {
    flex: 1,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  trophyEmoji: { fontSize: 28 },
  trophyName: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.onSurface,
    textAlign: "center",
    marginBottom: 4,
  },
  tierPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  tierText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // In progress
  progressList: { gap: spacing.md },
  progressCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressEmojiBox: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progressEmoji: { fontSize: 28, opacity: 0.4 },
  lockPill: {
    position: "absolute",
    right: -3,
    bottom: -3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  progressTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  progressName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.onSurface,
  },
  progressDesc: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.muted,
    marginBottom: 8,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceTertiary,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
  },
  progressBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressReq: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.muted,
  },
  progressPct: {
    fontSize: 11,
    fontWeight: "800",
  },

  // Settings
  settingsCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
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

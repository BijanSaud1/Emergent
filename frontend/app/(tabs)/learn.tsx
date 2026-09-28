import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  TextInput,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@react-native-vector-icons/feather";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";
import { usesNativeTabs } from "@/src/navigation";
import { ProgressBar } from "@/src/components/progress-bar";
import { categories, courses, Course } from "@/src/data/mock";

const chipEmojis: Record<string, string> = {
  All: "✨",
  Trending: "🔥",
  Biology: "🌿",
  Physics: "⚛️",
  Psychology: "🧠",
  Philosophy: "🚋",
  History: "🏛️",
};

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;
  const scrollPadBottom = spacing.xxl;
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const inProgress = courses.filter((c) => c.progress > 0);
  const filtered = courses.filter((c) => {
    const matchCat =
      active === "All" ||
      c.category === active ||
      (active === "Trending" && c.progress > 0);
    const matchQuery =
      query.trim() === "" ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.language.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const totalHours = courses.reduce((acc) => acc + 1, 0);

  return (
    <View style={styles.container} testID="learn-screen">
      {/* Sticky header with subtle gradient */}
      <LinearGradient
        colors={[colors.brandPrimary + "10", colors.surface]}
        style={[styles.header, { paddingTop: insets.top + spacing.md }]}
      >
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>
                {courses.length}+ CONCEPTS
              </Text>
            </View>
            <Text style={styles.title}>Learn something{"\n"}new today</Text>
          </View>
          <Pressable style={styles.iconBtn} testID="filter-btn">
            <Feather name="sliders" size={18} color={colors.onSurface} />
          </Pressable>
        </View>

        <View style={styles.searchBar} testID="search-bar">
          <Feather name="search" size={16} color={colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search concepts, subjects…"
            placeholderTextColor={colors.muted}
            value={query}
            onChangeText={setQuery}
            testID="search-input"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")} testID="clear-btn">
              <Feather name="x" size={16} color={colors.muted} />
            </Pressable>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
          testID="category-chips"
        >
          {categories.map((c) => {
            const selected = c === active;
            return (
              <Pressable
                key={c}
                onPress={() => setActive(c)}
                style={[
                  styles.chip,
                  selected ? styles.chipActive : styles.chipInactive,
                ]}
                testID={`chip-${c}`}
              >
                <Text style={styles.chipEmoji}>{chipEmojis[c] ?? "📚"}</Text>
                <Text
                  style={[
                    styles.chipText,
                    selected
                      ? { color: colors.onBrandPrimary }
                      : { color: colors.onSurface },
                  ]}
                >
                  {c}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </LinearGradient>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.md,
          paddingBottom: scrollPadBottom + bottomChrome,
          gap: spacing.md,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          inProgress.length > 0 ? (
            <View style={styles.inProgressBlock}>
              <View style={styles.sectionHead}>
                <Text style={styles.sectionTitle}>Continue learning</Text>
                <View style={styles.sectionPill}>
                  <Text style={styles.sectionPillText}>
                    {inProgress.length} active
                  </Text>
                </View>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: spacing.md }}
              >
                {inProgress.map((c) => (
                  <Pressable
                    key={c.id}
                    style={styles.progressChip}
                    onPress={() => router.push(`/concept/${c.id}`)}
                    testID={`progress-${c.id}`}
                  >
                    <View
                      style={[
                        styles.progressChipEmoji,
                        { backgroundColor: c.color + "22" },
                      ]}
                    >
                      <Text style={{ fontSize: 20 }}>{c.emoji}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.progressChipTitle} numberOfLines={1}>
                        {c.title}
                      </Text>
                      <View style={styles.progressChipBar}>
                        <View
                          style={[
                            styles.progressChipFill,
                            {
                              width: `${c.progress * 100}%`,
                              backgroundColor: c.color,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressChipPct}>
                        {Math.round(c.progress * 100)}%
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>

              <View style={styles.allHeader}>
                <Text style={styles.sectionTitle}>
                  {active === "All" ? "All concepts" : active}
                </Text>
                <Text style={styles.allCount}>
                  {filtered.length} concept{filtered.length === 1 ? "" : "s"}
                </Text>
              </View>
            </View>
          ) : null
        }
        renderItem={({ item }) => <CourseCard course={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No concepts found</Text>
            <Text style={styles.emptyText}>
              Try another subject or clear your search.
            </Text>
          </View>
        }
      />
    </View>
  );
}

function CourseCard({ course }: { course: Course }) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.card}
      testID={`course-${course.id}`}
      onPress={() => router.push(`/concept/${course.id}`)}
    >
      <View style={[styles.cardImageBox, { backgroundColor: course.color }]}>
        <Image
          source={{ uri: course.image }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={150}
        />
        <LinearGradient
          colors={["rgba(19,22,20,0.05)", "rgba(19,22,20,0.55)"]}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.cardEmoji}>{course.emoji}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTopRow}>
          <View
            style={[
              styles.subjectDot,
              { backgroundColor: course.color },
            ]}
          />
          <Text style={styles.subjectText}>{course.category}</Text>
          <View style={styles.dotSpacer} />
          <View style={styles.levelChip}>
            <Text style={styles.levelChipText}>{course.level}</Text>
          </View>
        </View>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {course.title}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {course.subtitle}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Feather name="layers" size={11} color={colors.muted} />
            <Text style={styles.metaText}>{course.lessons}</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="clock" size={11} color={colors.muted} />
            <Text style={styles.metaText}>{course.duration}</Text>
          </View>
          <View style={styles.xpChip}>
            <Feather name="zap" size={10} color={colors.onBrandSecondary} />
            <Text style={styles.xpChipText}>{course.xp}</Text>
          </View>
        </View>

        {course.progress > 0 ? (
          <View style={styles.progressBlock}>
            <View style={styles.miniBarTrack}>
              <View
                style={[
                  styles.miniBarFill,
                  {
                    width: `${course.progress * 100}%`,
                    backgroundColor: course.color,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: course.color }]}>
              {Math.round(course.progress * 100)}%
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  header: {
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  headerBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.brandPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  headerBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.onBrandPrimary,
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  searchBar: {
    marginHorizontal: spacing.lg,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
    fontWeight: "500",
    ...Platform.select({ web: { outlineStyle: "none" as any } }),
  },
  chipRow: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    height: 56,
    alignItems: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 38,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    flexShrink: 0,
  },
  chipActive: {
    backgroundColor: colors.brandPrimary,
    borderWidth: 1.5,
    borderColor: colors.brandPrimary,
  },
  chipInactive: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipEmoji: { fontSize: 14 },
  chipText: { fontSize: 13, fontWeight: "700" },

  // In progress block
  inProgressBlock: {
    marginBottom: spacing.md,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  sectionPill: {
    backgroundColor: colors.brandPrimary + "18",
    paddingHorizontal: spacing.md,
    height: 22,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionPillText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.brandPrimary,
    letterSpacing: 0.3,
  },
  progressChip: {
    width: 220,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressChipEmoji: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  progressChipTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.onSurface,
    marginBottom: 6,
  },
  progressChipBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceTertiary,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressChipFill: { height: 4, borderRadius: 2 },
  progressChipPct: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.muted,
  },
  allHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.xl,
    marginBottom: 4,
  },
  allCount: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.muted,
  },

  // Card — horizontal
  card: {
    flexDirection: "row",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
    }),
  },
  cardImageBox: {
    width: 108,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: spacing.sm,
  },
  cardEmoji: {
    fontSize: 40,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardBody: {
    flex: 1,
    padding: spacing.md,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  subjectDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  subjectText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.muted,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  dotSpacer: { flex: 1 },
  levelChip: {
    backgroundColor: colors.surfaceTertiary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  levelChipText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.onSurface,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metaText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.muted,
  },
  xpChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colors.brandSecondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginLeft: "auto",
  },
  xpChipText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.onBrandSecondary,
  },
  progressBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: 4,
  },
  miniBarTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceTertiary,
    overflow: "hidden",
  },
  miniBarFill: { height: 4, borderRadius: 2 },
  progressText: {
    fontSize: 11,
    fontWeight: "800",
  },

  // Empty
  empty: {
    alignItems: "center",
    paddingVertical: spacing.xxxl,
    gap: 4,
  },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.sm },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.onSurface,
  },
  emptyText: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: "500",
  },
});

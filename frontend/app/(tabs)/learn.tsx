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
import Feather from "@react-native-vector-icons/feather";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/src/theme";
import { usesNativeTabs } from "@/src/navigation";
import { ProgressBar } from "@/src/components/progress-bar";
import { categories, courses, Course } from "@/src/data/mock";

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const bottomChrome = usesNativeTabs ? insets.bottom : 0;
  const scrollPadBottom = spacing.xxl;
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = courses.filter((c) => {
    const matchCat = active === "All" || c.category === active || (active === "Popular" && c.progress > 0);
    const matchQuery =
      query.trim() === "" ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.language.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <View style={styles.container} testID="learn-screen">
      {/* Sticky header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Learn</Text>
            <Text style={styles.subtitle}>Explore a new concept</Text>
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
      </View>

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
        renderItem={({ item }) => <CourseCard course={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="inbox" size={40} color={colors.muted} />
            <Text style={styles.emptyText}>No concepts found</Text>
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
      <View style={[styles.cardCover, { backgroundColor: course.color }]}>
        <Image
          source={{ uri: course.image }}
          style={styles.cardImage}
          contentFit="cover"
          transition={150}
        />
        <View style={styles.cardScrim} />
        <View style={styles.cardCoverTop}>
          <View style={[styles.levelPill, { backgroundColor: "rgba(255,255,255,0.95)" }]}>
            <Text style={[styles.levelText, { color: course.color }]}>{course.level}</Text>
          </View>
          <View style={styles.subjectPill}>
            <Text style={styles.subjectText}>{course.category}</Text>
          </View>
        </View>
        <Text style={styles.cardEmoji}>{course.emoji}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {course.title}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {course.subtitle}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Feather name="layers" size={12} color={colors.muted} />
            <Text style={styles.metaText}>{course.lessons} lessons</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="clock" size={12} color={colors.muted} />
            <Text style={styles.metaText}>{course.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="zap" size={12} color={colors.brandSecondary} />
            <Text
              style={[styles.metaText, { color: colors.onSurface, fontWeight: "700" }]}
            >
              {course.xp}
            </Text>
          </View>
        </View>

        {course.progress > 0 ? (
          <View style={styles.progressBlock}>
            <ProgressBar progress={course.progress} />
            <Text style={styles.progressText}>
              {Math.round(course.progress * 100)}% complete
            </Text>
          </View>
        ) : (
          <View style={styles.startBtn}>
            <Text style={styles.startBtnText}>Start concept</Text>
            <Feather name="arrow-right" size={14} color={colors.onBrandPrimary} />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  header: {
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
    paddingBottom: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
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
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    marginHorizontal: spacing.lg,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceTertiary,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
    ...Platform.select({ web: { outlineStyle: "none" as any } }),
  },
  chipRow: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    height: 56,
    alignItems: "center",
  },
  chip: {
    height: 36,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
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
  chipText: { fontSize: 13, fontWeight: "600" },

  card: {
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
  cardCover: {
    height: 140,
    justifyContent: "flex-end",
    padding: spacing.md,
    position: "relative",
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.55,
  },
  cardScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(19,22,20,0.15)",
  },
  cardCoverTop: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardEmoji: {
    position: "absolute",
    right: spacing.md,
    bottom: spacing.sm,
    fontSize: 56,
  },
  subjectPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: "rgba(19,22,20,0.35)",
  },
  subjectText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  levelPill: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  levelText: {
    color: colors.onBrandPrimary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  cardBody: { padding: spacing.lg },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.muted,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, color: colors.muted, fontWeight: "500" },
  progressBlock: { gap: 6 },
  progressText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.brandPrimary,
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
  },
  startBtnText: {
    color: colors.onBrandPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  empty: {
    alignItems: "center",
    paddingVertical: spacing.xxxl,
    gap: spacing.md,
  },
  emptyText: { fontSize: 14, fontWeight: "500", color: colors.muted },
});

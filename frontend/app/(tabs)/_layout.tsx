import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import Feather from "@react-native-vector-icons/feather";

import { colors, radius } from "@/src/theme";
import { usesNativeTabs } from "@/src/navigation";

// NativeTabs only on iOS 26+
let NativeTabsExport: any = null;
if (usesNativeTabs) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  NativeTabsExport = require("expo-router/unstable-native-tabs");
}

function TabBarBackground() {
  if (Platform.OS === "web") {
    return <View style={[StyleSheet.absoluteFill, styles.webBar]} />;
  }
  return (
    <BlurView
      tint="light"
      intensity={80}
      style={[StyleSheet.absoluteFill, styles.blurBar]}
    />
  );
}

export default function TabsLayout() {
  if (usesNativeTabs && NativeTabsExport) {
    const { NativeTabs } = NativeTabsExport;
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Icon sf="house.fill" />
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="learn">
          <NativeTabs.Trigger.Icon sf="book.fill" />
          <NativeTabs.Trigger.Label>Learn</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="challenges">
          <NativeTabs.Trigger.Icon sf="bolt.fill" />
          <NativeTabs.Trigger.Label>Challenges</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <NativeTabs.Trigger.Icon sf="person.fill" />
          <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brandPrimary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: { alignSelf: "center" },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
          ...(Platform.OS === "web" ? { height: 64 } : {}),
        },
        tabBarBackground: () => <TabBarBackground />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color }) => (
            <Feather name="zap" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  blurBar: {
    backgroundColor: "rgba(252,252,249,0.72)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  webBar: {
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
});

import { Platform } from "react-native";

// iOS 26+ uses NativeTabs (Liquid Glass); everything else uses classic Tabs.
export const usesNativeTabs =
  Platform.OS === "ios" && parseInt(String(Platform.Version), 10) >= 26;

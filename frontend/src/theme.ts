import { useMemo } from "react";
import { Appearance, StyleSheet, useColorScheme } from "react-native";

export type ColorScheme = "light" | "dark";

const light = {
  // Surfaces
  surface: "#FCFCF9",
  onSurface: "#131614",
  surfaceSecondary: "#FFFFFF",
  onSurfaceSecondary: "#131614",
  surfaceTertiary: "#F2F2ED",
  onSurfaceTertiary: "#131614",
  surfaceInverse: "#1A1D1B",
  onSurfaceInverse: "#FFFFFF",
  muted: "#7A807D",

  // Brand
  brand: "#04B077",
  onBrand: "#FFFFFF",
  brandPrimary: "#04B077",
  onBrandPrimary: "#FFFFFF",
  brandSecondary: "#FFC800",
  onBrandSecondary: "#4A3A00",
  brandTertiary: "#FF5277",
  onBrandTertiary: "#FFFFFF",

  // Status
  success: "#04B077",
  onSuccess: "#FFFFFF",
  warning: "#FFC800",
  onWarning: "#4A3A00",
  error: "#FF3B30",
  onError: "#FFFFFF",
  info: "#131614",
  onInfo: "#FFFFFF",

  // Lines
  border: "#E8E8E3",
  borderStrong: "#D1D1CA",
  divider: "#F0F0EB",
};

export type ThemeColors = typeof light;

export const defaultScheme = "light" satisfies ColorScheme;

export const themes: { light: ThemeColors; dark?: ThemeColors } = { light };

export const colors = light;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
};

// System fonts with weights (following design intent without external font packages)
export const fonts = {
  display: undefined as string | undefined,
  text: undefined as string | undefined,
};

export function setColorScheme(scheme: ColorScheme | null) {
  Appearance.setColorScheme?.(scheme ?? "unspecified");
}

setColorScheme?.(themes.dark ? null : defaultScheme);

export function useTheme(): { scheme: ColorScheme; colors: ThemeColors } {
  const system = useColorScheme();
  const scheme: ColorScheme = system && themes[system] ? system : defaultScheme;
  return { scheme, colors: themes[scheme] ?? themes.light };
}

export function makeStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  factory: (colors: ThemeColors) => T & StyleSheet.NamedStyles<any>,
): () => T {
  return function useStyles(): T {
    const { colors } = useTheme();
    return useMemo(() => StyleSheet.create(factory(colors)), [colors]);
  };
}

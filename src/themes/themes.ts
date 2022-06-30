import deepMerge from "../utils/deepMerge";
import { ScheduleTheme, ScheduleThemeOverride } from "../utils/models";
import { appleColors, appleTheme } from "./apple";
import { googleColors, googleTheme } from "./google";

export type ThemeName = "google" | "apple";

export const themes: Record<ThemeName, ScheduleTheme> = {
  google: googleTheme,
  apple: appleTheme,
};

export const colors: Record<ThemeName, Record<string, string>> = {
  google: googleColors,
  apple: appleColors,
};

export const createTheme = (
  baseTheme: ScheduleTheme | ThemeName,
  partialTheme: ScheduleThemeOverride
): ScheduleTheme => {
  const selectedBaseTheme =
    typeof baseTheme === "string" ? themes[baseTheme] : baseTheme;

  return deepMerge.withOptions(
    { mergeArrays: false },
    selectedBaseTheme,
    partialTheme
  );
};

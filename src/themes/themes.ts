import deepMerge from "src/utils/deepMerge";
import { ScheduleTheme } from "src/utils/models";
import { PartialDeep } from "type-fest";
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

export const DEFAULT_THEME = googleTheme;

export const createTheme = (
  baseTheme: ScheduleTheme | ThemeName,
  partialTheme: PartialDeep<ScheduleTheme>
): ScheduleTheme => {
  const selectedBaseTheme =
    typeof baseTheme === "string" ? themes[baseTheme] : baseTheme;

  return deepMerge.withOptions(
    { mergeArrays: false },
    selectedBaseTheme,
    partialTheme
  );
};

import { PartialDeep } from "type-fest";
import { ScheduleTheme, ThemeName, themes } from "./themes";
import deepMerge from "./utils/deepMerge";

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

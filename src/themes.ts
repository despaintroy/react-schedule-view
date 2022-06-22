import { CSSProperties, FC } from "react";
import { CalendarEvent } from "./models";
import { appleTheme, colors as appleColors } from "./themes/apple";
import { colors as googleColors, googleTheme } from "./themes/google";

export type ThemeName = "google" | "apple";

export const themes: Record<ThemeName, ScheduleTheme> = {
  google: googleTheme,
  apple: appleTheme,
};

export const colors: Record<ThemeName, Record<string, string>> = {
  google: googleColors,
  apple: appleColors,
};

export const DEFAULT_THEME = themes.google;

export interface ScheduleTheme<
  CustomCalendarEvent extends CalendarEvent = CalendarEvent
> {
  fontFamily: CSSProperties["fontFamily"];
  dayLabels: {
    style: CSSProperties;
  };
  grid: {
    subdivisionsPerHour: number; // Default 12, means 5 min intervals
    hourHeight: CSSProperties["height"];
  };
  majorGridlines: {
    borderStyle: CSSProperties["borderStyle"];
  };
  minorGridlines: {
    borderStyle: CSSProperties["borderStyle"];
    linesPerHour: number;
  };
  verticalGridlines: {
    style: CSSProperties["borderStyle"];
  };
  eventTiles: {
    timeRangeFormatter: (startTime: number, endTime: number) => string;
    defaultColor: CSSProperties["backgroundColor"];
    style:
      | CSSProperties
      | ((color: CSSProperties["backgroundColor"]) => CSSProperties);
    customTileComponent?: FC<{ event: CustomCalendarEvent }>;
  };
  timeScale: {
    timeFormatter: (time: number) => string;
    style: CSSProperties;
  };
}

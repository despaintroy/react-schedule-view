import { CSSProperties } from "react";
import { testContrast } from "../utils/cssColorFunctions";
import { numToHH, timeRangeFormatter } from "../utils/helpers";
import { CalendarEvent, ScheduleTheme } from "../utils/models";

export const googleColors = {
  greyGridline: "#DADCE0",
  greyTimeLabel: "#70757a",
  greyDayLabel: "#3c4043",
  blue: "#5186EC",
  red: "#C3281C",
  yellow: "#EEC04B",
  purple: "#8332A4",
  green: "#397D49",
  indigo: "#4153AF",
  pink: "#C63461",
  lavender: "#AF9FD7",
  orange: "#E35C33",
  brown: "#74574A",
};

const calculateTextColor = (
  event: CalendarEvent,
  theme: ScheduleTheme
): CSSProperties["color"] => {
  const defaultColor =
    typeof theme.defaultTileColor === "function"
      ? theme.defaultTileColor(event)
      : theme.defaultTileColor;

  return testContrast(event.color ?? defaultColor, "white", "black", 0.3);
};

export const googleTheme: ScheduleTheme = {
  style: {
    root: { fontFamily: "Roboto, Helvetica, Arial, sans-serif" },
    dayLabels: {
      color: googleColors.greyDayLabel,
      textTransform: "uppercase",
    },
    timeScaleLabels: {
      color: googleColors.greyTimeLabel,
      fontSize: "0.7rem",
    },
    majorGridlinesBorder: `1px solid ${googleColors.greyGridline}`,
    minorGridlinesBorder: `1px dotted ${googleColors.greyGridline}`,
    verticalGridlinesBorder: `1px solid ${googleColors.greyGridline}`,
    eventTiles: (event, theme) => ({
      color: calculateTextColor(event, theme),
    }),
  },
  hourHeight: "46px",
  minorGridlinesPerHour: 0,
  timeRangeFormatter: timeRangeFormatter,
  defaultTileColor: googleColors.blue,
  timeFormatter: numToHH,
};

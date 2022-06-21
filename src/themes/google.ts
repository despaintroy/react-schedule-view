import { numToHH, timeRangeFormatter } from "../helpers";
import { testContrast } from "../utils/cssColorFunctions";
import { ScheduleTheme } from "./themes";

export const colors = {
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

export const googleTheme: ScheduleTheme = {
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  dayLabels: {
    style: {
      color: colors.greyDayLabel,
      textTransform: "uppercase",
    },
  },
  grid: {
    subdivisionsPerHour: 12,
    hourHeight: "46px",
  },
  majorGridlines: {
    borderStyle: `1px solid ${colors.greyGridline}`,
  },
  minorGridlines: {
    borderStyle: `1px dotted ${colors.greyGridline}`,
    linesPerHour: 0,
  },
  verticalGridlines: {
    style: `1px solid ${colors.greyGridline}`,
  },
  eventTiles: {
    timeRangeFormatter: timeRangeFormatter,
    defaultColor: colors.blue,
    style: (color) => ({
      color: testContrast(color, "white", "black", 0.3),
    }),
  },
  timeScale: {
    timeFormatter: numToHH,
    style: {
      color: colors.greyTimeLabel,
      fontSize: "0.7rem",
    },
  },
};

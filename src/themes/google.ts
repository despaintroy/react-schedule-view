import { ScheduleTheme } from "../utils/models";
import { testContrast } from "../utils/cssColorFunctions";
import { numToHH, timeRangeFormatter } from "../utils/helpers";

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

export const googleTheme: ScheduleTheme = {
  style: { fontFamily: "Roboto, Helvetica, Arial, sans-serif" },
  dayLabels: {
    style: {
      color: googleColors.greyDayLabel,
      textTransform: "uppercase",
    },
  },
  grid: {
    subdivisionsPerHour: 12,
    hourHeight: "46px",
  },
  majorGridlines: {
    borderStyle: `1px solid ${googleColors.greyGridline}`,
  },
  minorGridlines: {
    borderStyle: `1px dotted ${googleColors.greyGridline}`,
    linesPerHour: 0,
  },
  verticalGridlines: {
    style: `1px solid ${googleColors.greyGridline}`,
  },
  eventTiles: {
    timeRangeFormatter: timeRangeFormatter,
    defaultColor: googleColors.blue,
    style: ({ event, theme }) => ({
      color: testContrast(
        event.color ?? theme.eventTiles.defaultColor,
        "white",
        "black",
        0.3
      ),
    }),
  },
  timeScale: {
    timeFormatter: numToHH,
    style: {
      color: googleColors.greyTimeLabel,
      fontSize: "0.7rem",
    },
  },
};

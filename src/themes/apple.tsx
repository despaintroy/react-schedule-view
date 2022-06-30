import { numToHH, numToHHMM } from "../utils/helpers";
import { ScheduleTheme } from "../utils/models";
import { AppleEventTile } from "./AppleEventTile";

export const appleColors = {
  greyBlackLabel: "#272727",
  greyLabel: "#C0C0C0",
  greyGridline: "#E5E5E5",
  blue: "#4FACF2",
  red: "#EB446A",
  orange: "#F19937",
  yellow: "#F9D64A",
  green: "#6BD35F",
  purple: "#C07ADB",
  brown: "#A78E6D",
};

export const appleTheme: ScheduleTheme = {
  style: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  dayLabels: {
    style: {
      color: appleColors.greyBlackLabel,
    },
  },
  grid: {
    subdivisionsPerHour: 12,
    hourHeight: "46px",
  },
  majorGridlines: {
    borderStyle: `1px solid ${appleColors.greyGridline}`,
  },
  minorGridlines: {
    borderStyle: `1px dotted ${appleColors.greyGridline}`,
    linesPerHour: 0,
  },
  verticalGridlines: {
    style: `1px solid ${appleColors.greyGridline}`,
  },
  eventTiles: {
    timeRangeFormatter: (startTime, _endTime) =>
      startTime % 1 === 0 ? numToHH(startTime) : numToHHMM(startTime),
    defaultColor: appleColors.blue,
    style: {
      padding: 0,
      marginRight: "2px",
      marginBlock: "1px",
      backgroundColor: "unset",
    },
    customTileComponent: AppleEventTile,
  },
  timeScale: {
    timeFormatter: (time) => (time === 12 ? "Noon" : numToHH(time)),
    style: {
      color: appleColors.greyLabel,
      fontSize: "0.7rem",
    },
  },
};

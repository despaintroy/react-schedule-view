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
    root: { fontFamily: "Roboto, Helvetica, Arial, sans-serif" },
    dayLabels: {
      color: appleColors.greyBlackLabel,
    },
    timeScaleLabels: {
      color: appleColors.greyLabel,
      fontSize: "0.7rem",
    },
    majorGridlinesBorder: `1px solid ${appleColors.greyGridline}`,
    minorGridlinesBorder: `1px dotted ${appleColors.greyGridline}`,
    verticalGridlinesBorder: `1px solid ${appleColors.greyGridline}`,
    eventTiles: {
      padding: 0,
      marginRight: "2px",
      marginBlock: "1px",
      backgroundColor: "unset",
    },
  },
  hourHeight: "46px",
  minorGridlinesPerHour: 0,
  timeRangeFormatter: (startTime, _endTime) =>
    startTime % 1 === 0 ? numToHH(startTime) : numToHHMM(startTime),
  defaultTileColor: appleColors.blue,
  timeFormatter: (time) => (time === 12 ? "Noon" : numToHH(time)),
  customTileComponent: AppleEventTile,
};

import { PropsWithChildren } from "react";
import { numToHH, numToHHMM, timeRangeFormatter } from "../helpers";
import { CalendarEvent } from "../models";
import { cssColorToRGB, RGBToHSL } from "../utils/cssColorFunctions";
import { ScheduleTheme } from "../themes";

export const colors = {
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

const AppleEventTile = <CustomCalendarEvent extends CalendarEvent>(
  props: PropsWithChildren<{ event: CustomCalendarEvent }>
) => {
  const { event } = props;

  const colorRGB = cssColorToRGB(event.color);
  const colorHSL = RGBToHSL(colorRGB);
  const mediumLightnessColorString = `hsl(${colorHSL[0]}, ${colorHSL[1]}%, 50%)`;
  const darkLightnessColorString = `hsl(${colorHSL[0]}, ${colorHSL[1]}%, 30%)`;

  return (
    <div
      style={{
        padding: "5px",
        backgroundColor: `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, 0.3)`,
        height: "100%",
        borderLeft: `4px solid ${mediumLightnessColorString}`,
        color: darkLightnessColorString,
      }}
    >
      <div
        style={{
          fontSize: "0.8rem",
          fontWeight: "lighter",
          marginTop: "0.25rem",
        }}
      >
        {event.startTime % 1 === 0
          ? numToHH(event.startTime)
          : numToHHMM(event.startTime)}
      </div>
      <div style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
        {event.title}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          marginTop: "0.25rem",
        }}
      >
        {event.description}
      </div>
    </div>
  );
};

export const appleTheme: ScheduleTheme = {
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  dayLabels: {
    style: {
      color: colors.greyBlackLabel,
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
    style: {
      padding: 0,
      marginRight: "2px",
      marginBlock: "1px",
      backgroundColor: "unset",
    },
    customTileComponent: AppleEventTile,
  },
  timeScale: {
    timeFormatter: numToHH,
    style: {
      color: colors.greyLabel,
      fontSize: "0.7rem",
    },
  },
};

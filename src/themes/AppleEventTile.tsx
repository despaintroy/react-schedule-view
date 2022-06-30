import { useContext } from "react";
import { cssColorToRGB, RGBToHSL } from "../utils/cssColorFunctions";
import { CalendarEvent } from "../utils/models";
import { ThemeContext } from "../utils/themeContext";

export const AppleEventTile = <
  CustomCalendarEvent extends CalendarEvent
>(props: {
  event: CustomCalendarEvent;
}) => {
  const { event } = props;
  const theme = useContext(ThemeContext);

  const color = event.color ?? theme.eventTiles.defaultColor;
  const colorRGB = cssColorToRGB(color);
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
      {theme.eventTiles.tileContent ? (
        theme.eventTiles.tileContent({ event })
      ) : (
        <>
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: "lighter",
            }}
          >
            {theme.eventTiles.timeRangeFormatter(
              event.startTime,
              event.endTime
            )}
          </div>
          <div
            style={{ fontWeight: "bold", fontSize: "0.8rem", lineHeight: 1.2 }}
          >
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
        </>
      )}
    </div>
  );
};

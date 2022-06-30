import { useContext } from "react";
import { ThemeContext } from "../utils/themeContext";
import { testContrast } from "../utils/cssColorFunctions";
import { positionEventsOnGrid } from "../utils/eventOrganizeDisplay";
import { CalendarEvent, DaySchedule } from "../utils/models";

export interface EventRectanglesProps<
  CustomCalendarEvent extends CalendarEvent
> {
  daySchedules: DaySchedule<CustomCalendarEvent>[];
  subdivisionsPerHour: number;
  viewStartTime: number;
  viewEndTime: number;
  handleEventClick?: (event: CustomCalendarEvent) => void;
}

const EventRectangles = <CustomCalendarEvent extends CalendarEvent>(
  props: EventRectanglesProps<CustomCalendarEvent>
) => {
  const {
    daySchedules,
    subdivisionsPerHour,
    viewStartTime,
    viewEndTime,
    handleEventClick,
  } = props;

  const theme = useContext(ThemeContext);

  const {
    eventTiles: {
      defaultColor,
      timeRangeFormatter,
      style,
      customTileComponent: CustomTileComponent,
    },
  } = theme;

  return (
    <>
      {daySchedules.map((day, dayIndex) =>
        positionEventsOnGrid({
          subdivisionsPerHour,
          events: day.events,
          viewStartTime,
          viewEndTime,
        }).map(
          (
            { totalCols, groupStartRow, groupEndRow, positionedEvents },
            groupIndex
          ) => {
            return (
              <div
                key={groupIndex}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${totalCols}, 1fr)`,
                  gridTemplateRows: `repeat(${
                    groupEndRow - groupStartRow
                  }, 1fr)`,
                  gridColumn: `${dayIndex + 2}`,
                  gridRow: `${groupStartRow} / ${groupEndRow}`,
                  marginRight: "5%",
                }}
              >
                {positionedEvents.map(
                  ({ col, endCol, row, endRow, event }, eventIndex) => {
                    const color = event.color ?? defaultColor;

                    return (
                      <div
                        key={`${dayIndex}-${groupIndex}-${eventIndex}`}
                        style={{
                          gridColumn: `${col} / ${endCol}`,
                          gridRow: `${row} / ${endRow}`,
                          overflow: "hidden",
                          cursor: handleEventClick ? "pointer" : "default",
                          marginInline: "0.5px",
                          marginBottom: "1px",
                          borderRadius: "5px",
                          padding: "5px",
                          backgroundColor: color,
                          color: testContrast(color, "white", "black"),
                          ...(typeof style === "function"
                            ? style({ event, theme })
                            : style),
                        }}
                        onClick={() => (handleEventClick ?? (() => {}))(event)}
                      >
                        {CustomTileComponent ? (
                          <CustomTileComponent event={event} />
                        ) : (
                          <>
                            <div style={{ fontWeight: "bold" }}>
                              {event.title}
                            </div>
                            <div
                              style={{
                                fontSize: "0.8rem",
                                marginTop: "0.25rem",
                              }}
                            >
                              {timeRangeFormatter(
                                event.startTime,
                                event.endTime
                              )}
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
                  }
                )}
              </div>
            );
          }
        )
      )}
    </>
  );
};

export default EventRectangles;

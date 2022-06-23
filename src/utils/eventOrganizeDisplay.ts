import { clamp } from "./helpers";
import { CalendarEvent, PositionedEventGroup } from "./models";

/**
 * Determines if the start/end times of two events overlap if their
 * total duration is greater than their outer duration.
 *
 * @returns true / false if the events overlap
 */
const eventsOverlap = (event1: CalendarEvent, event2: CalendarEvent) => {
  const totalDuration =
    event1.endTime - event1.startTime + (event2.endTime - event2.startTime);
  const outerDuration =
    Math.max(event1.endTime, event2.endTime) -
    Math.min(event1.startTime, event2.startTime);
  return outerDuration < totalDuration;
};

/**
 * Determines the optimal layout for displaying events on a grid without overlapping
 * and while maximizing the size of each event
 *
 * @returns an array of groups of events annotated with size/position of each event
 */
export function positionEventsOnGrid<
  CustomCalendarEvent extends CalendarEvent
>(params: {
  events: CustomCalendarEvent[];
  viewStartTime: number;
  viewEndTime: number;
  subdivisionsPerHour: number;
}): PositionedEventGroup<CustomCalendarEvent>[] {
  const { events, viewStartTime, viewEndTime, subdivisionsPerHour } = params;

  const timeToRowNum = (time: number) => {
    const hourIndex = time - viewStartTime;
    const viewDuratinon = viewEndTime - viewStartTime;
    return (
      2 + Math.round(subdivisionsPerHour * clamp(hourIndex, 0, viewDuratinon))
    );
  };

  const eventGroups: CustomCalendarEvent[][][] = [];

  let tempGroup: CustomCalendarEvent[][] = [];
  let groupEndTime = Number.NEGATIVE_INFINITY;

  events
    .filter(
      (event) => event.startTime < viewEndTime && event.endTime > viewStartTime
    )
    .sort((a, b) => {
      if (a.startTime === b.startTime) return a.endTime - b.endTime;
      return a.startTime - b.startTime;
    })
    .forEach((event) => {
      // If event does not overlap with any events from the current group, start a new group
      if (tempGroup.length && event.startTime >= groupEndTime) {
        eventGroups.push([...tempGroup]);
        tempGroup = [];
        groupEndTime = Number.NEGATIVE_INFINITY;
      }

      groupEndTime = Math.max(groupEndTime, event.endTime);
      let didPlace = false;

      // Place the event in the leftmost track it fits in
      tempGroup.forEach((track) => {
        if (!didPlace && event.startTime >= track[track.length - 1].endTime) {
          track.push(event);
          didPlace = true;
        }
      });

      // If the event doesn't fit in any existing tracks, put it in a new one
      if (!didPlace) {
        tempGroup.push([event]);
      }
    });

  eventGroups.push([...tempGroup]);

  if (eventGroups.length === 0 || eventGroups[0].length === 0) {
    return [];
  }

  return eventGroups.map((group) => {
    const groupStartTime = Math.max(viewStartTime, group[0][0].startTime);
    const groupEndTime = Math.min(
      viewEndTime,
      group.reduce((acc, curr) => {
        return Math.max(acc, curr[curr.length - 1].endTime);
      }, Number.NEGATIVE_INFINITY)
    );

    const groupEndRow = timeToRowNum(groupEndTime);
    const groupStartRow = timeToRowNum(groupStartTime);
    const positionedEvents = group.flatMap((track, col) => {
      col += 1;

      return track.map((event) => {
        // Expand the event right as long as it doesn't overlap with any other events
        let endCol = col + 1;
        for (let i = col; i < group.length; i++) {
          if (group[i].find((e) => eventsOverlap(e, event))) break;
          endCol++;
        }

        const row =
          1 + Math.max(0, timeToRowNum(event.startTime) - groupStartRow);
        const endRow =
          1 +
          Math.min(timeToRowNum(event.endTime), groupEndRow) -
          groupStartRow;

        return {
          col,
          endCol,
          row,
          endRow,
          event,
        };
      });
    });

    return {
      totalCols: group.length,
      groupStartRow,
      groupEndRow,
      positionedEvents,
    };
  });
}

import { CSSProperties, FC } from "react";

export interface DaySchedule<
  CustomCalendarEvent extends CalendarEvent = CalendarEvent
> {
  name: string;
  events: CustomCalendarEvent[];
}

export interface CalendarEvent {
  startTime: number;
  endTime: number;
  title: string;
  description?: string;
  color?: CSSProperties["backgroundColor"];
}

// Rows/cols indexed starting from 1 to match CSS
export interface PositionedEvent<CustomCalendarEvent extends CalendarEvent> {
  event: CustomCalendarEvent;
  col: number;
  endCol: number;
  // Row numbers are relative to the first row of the event group
  row: number;
  endRow: number;
}

export interface PositionedEventGroup<
  CustomCalendarEvent extends CalendarEvent
> {
  totalCols: number;
  groupStartRow: number;
  groupEndRow: number;
  positionedEvents: PositionedEvent<CustomCalendarEvent>[];
}

export type ScheduleThemeOverride = DeepPartial<ScheduleTheme>;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface ScheduleTheme<
  CustomCalendarEvent extends CalendarEvent = CalendarEvent
> {
  style: CSSProperties;
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
      | ((args: {
          event: CustomCalendarEvent;
          theme: ScheduleTheme<CustomCalendarEvent>;
        }) => CSSProperties);
    customTileComponent?: FC<{ event: CustomCalendarEvent }>;
    tileContent?: FC<{ event: CustomCalendarEvent }>;
  };
  timeScale: {
    timeFormatter: (time: number) => string;
    style: CSSProperties;
  };
}

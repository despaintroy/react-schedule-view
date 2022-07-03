import { CSSProperties, FC } from "react";

export const SUBDIVISIONS_PER_HOUR = 12;

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
  style?: ScheduleThemeStyle;
  hourHeight: CSSProperties["height"];
  minorGridlinesPerHour: number;
  timeRangeFormatter: (startTime: number, endTime: number) => string;
  timeFormatter: (time: number) => string;
  defaultTileColor:
    | CSSProperties["backgroundColor"]
    | ((event: CustomCalendarEvent) => CSSProperties["backgroundColor"]);
  customTileComponent?: FC<{ event: CustomCalendarEvent }>;
  themeTileContent?: FC<{ event: CustomCalendarEvent }>;
}

export interface ScheduleThemeStyle<
  CustomCalendarEvent extends CalendarEvent = CalendarEvent
> {
  root?: CSSProperties;
  dayLabels?: CSSProperties;
  timeScaleLabels?: CSSProperties;
  eventTiles?:
    | CSSProperties
    | ((
        event: CustomCalendarEvent,
        theme: ScheduleTheme<CustomCalendarEvent>
      ) => CSSProperties);
  majorGridlinesBorder?: CSSProperties["borderStyle"];
  minorGridlinesBorder?: CSSProperties["borderStyle"];
  verticalGridlinesBorder?: CSSProperties["borderStyle"];
}

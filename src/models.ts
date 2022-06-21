import { CSSProperties } from "react";

export interface DaySchedule<
  CustomCalendarEvent extends CalendarEvent = CalendarEvent
> {
  name: string;
  events: CustomCalendarEvent[];
}

export interface CalendarEvent {
  id?: string;
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

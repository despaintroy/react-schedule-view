import { createContext, PropsWithChildren } from "react";
import { CalendarEvent, DaySchedule } from "./models";
import DayLabels from "./onGrid/DayLabels";
import EventRectangles from "./onGrid/EventRectangles";
import Gridlines from "./onGrid/Gridlines";
import TimeLabels from "./onGrid/TimeLabels";
import { DEFAULT_THEME, ScheduleTheme } from "./themes";

export interface ScheduleViewProps<CustomCalendarEvent extends CalendarEvent> {
  daySchedules: DaySchedule<CustomCalendarEvent>[];
  viewStartTime?: number;
  viewEndTime?: number;
  handleEventClick?: (event: CustomCalendarEvent) => void;
  theme?: ScheduleTheme;
}

export const ThemeContext = createContext(DEFAULT_THEME);

const ScheduleView = <CustomCalendarEvent extends CalendarEvent>(
  props: PropsWithChildren<ScheduleViewProps<CustomCalendarEvent>>
) => {
  const {
    daySchedules,
    viewStartTime = 0,
    viewEndTime = 24,
    handleEventClick,
    theme = DEFAULT_THEME,
  } = props;

  const {
    grid: { subdivisionsPerHour },
  } = theme;

  const numHours = viewEndTime - viewStartTime;
  const numDays = daySchedules.length;

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          fontFamily: theme.fontFamily,
          display: "grid",
          gridTemplateColumns: `auto repeat(${numDays}, 1fr)`,
          gridTemplateRows: `auto repeat(${
            numHours * subdivisionsPerHour
          }, calc(${theme.grid.hourHeight} / ${subdivisionsPerHour}))`,
        }}
      >
        <Gridlines numHours={numHours} numDays={numDays} />

        <DayLabels dayNames={daySchedules.map((day) => day.name)} />

        <TimeLabels
          viewStartTime={viewStartTime}
          numHours={numHours}
          subdivisionsPerHour={subdivisionsPerHour}
        />

        <EventRectangles
          daySchedules={daySchedules}
          subdivisionsPerHour={subdivisionsPerHour}
          viewStartTime={viewStartTime}
          viewEndTime={viewEndTime}
          handleEventClick={handleEventClick}
        />
      </div>
    </ThemeContext.Provider>
  );
};

export default ScheduleView;

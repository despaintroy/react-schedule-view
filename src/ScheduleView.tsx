import DayLabels from "./onGrid/DayLabels";
import EventRectangles from "./onGrid/EventRectangles";
import Gridlines from "./onGrid/Gridlines";
import TimeLabels from "./onGrid/TimeLabels";
import { ThemeName, themes } from "./themes";
import { DEFAULT_THEME } from "./themes/default";
import {
  CalendarEvent,
  DaySchedule,
  ScheduleTheme,
  SUBDIVISIONS_PER_HOUR,
} from "./utils/models";
import { ThemeContext } from "./utils/themeContext";

export interface ScheduleViewProps<CustomCalendarEvent extends CalendarEvent> {
  daySchedules: DaySchedule<CustomCalendarEvent>[];
  viewStartTime?: number;
  viewEndTime?: number;
  handleEventClick?: (event: CustomCalendarEvent) => void;
  theme?: ScheduleTheme | ThemeName;
}

const ScheduleView = <CustomCalendarEvent extends CalendarEvent>(
  props: ScheduleViewProps<CustomCalendarEvent>
) => {
  const {
    daySchedules,
    viewStartTime = 0,
    viewEndTime = 24,
    handleEventClick,
    theme: themeOrName = DEFAULT_THEME,
  } = props;

  const theme =
    typeof themeOrName === "string" ? themes[themeOrName] : themeOrName;

  const { hourHeight, style } = theme;

  const numHours = viewEndTime - viewStartTime;
  const numDays = daySchedules.length;

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `auto repeat(${numDays}, 1fr)`,
          gridTemplateRows: `auto repeat(${
            numHours * SUBDIVISIONS_PER_HOUR
          }, calc(${hourHeight} / ${SUBDIVISIONS_PER_HOUR}))`,
          ...style?.root,
        }}
      >
        <Gridlines numHours={numHours} numDays={numDays} />

        <DayLabels dayNames={daySchedules.map((day) => day.name)} />

        <TimeLabels viewStartTime={viewStartTime} numHours={numHours} />

        <EventRectangles
          daySchedules={daySchedules}
          viewStartTime={viewStartTime}
          viewEndTime={viewEndTime}
          handleEventClick={handleEventClick}
        />
      </div>
    </ThemeContext.Provider>
  );
};

export default ScheduleView;

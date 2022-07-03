# Props

## Component Props

### ScheduleView

| Prop               | Type                                          | Description                                |
| ------------------ | --------------------------------------------- | ------------------------------------------ |
| `daySchedules`     | `Array<DaySchedule>`                          | Data that describes daily events           |
| `viewStartTime`    | `number \| undefined`                         | View start time (24 hr)                    |
| `viewEndTime`      | `number \| undefined`                         | View end time (24 hr)                      |
| `handleEventClick` | `(event: CalendarEvent) => void \| undefined` | Callback for when an event is clicked      |
| `theme`            | `ScheduleTheme \| ThemeName \| undefined`     | `ScheduleTheme` or `"apple"` or `"google"` |

## Types

### DaySchedule

| Property | Type                             | Description                 |
| -------- | -------------------------------- | --------------------------- |
| `name`   | `string`                         | Day label for top of column |
| `events` | `Array<T extends CalendarEvent>` | See `CalendarEvent`         |

### CalendarEvent

| Property      | Type                  | Description                               |
| ------------- | --------------------- | ----------------------------------------- |
| `startTime`   | `number`              | Event start time (24 hr)                  |
| `endTime`     | `number`              | Event end time (24 hr)                    |
| `title`       | `string`              | Event title                               |
| `description` | `string \| undefined` | Optional event description                |
| `color`       | `string \| undefined` | Optional tile color (any CSS color value) |

### ScheduleTheme

| Property                | Type                                             | Description                                      |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------ |
| `style`                 | `ScheduleThemeStyle \| undefined`                | See `ScheduleThemeStyle`                         |
| `hourHeight`            | `string`                                         | Height of each hour tile as a CSS value          |
| `minorGridlinesPerHour` | `number`                                         | Number of minor gridlines subdividing each hour  |
| `timeRangeFormatter`    | `(startTime: number, endTime: number) => string` | Formatter for time range labels                  |
| `timeFormatter`         | `(time: number) => string`                       | Formatter for time labels                        |
| `defaultTileColor`      | `string \| ((event: CalendarEvent) => string)`   | Default tile color as a CSS value                |
| `customTileComponent`   | `FC<{ event: CalendarEvent }> \| undefined`      | Overrides component used to render tiles         |
| `themeTileContent`      | `FC<{ event: CalendarEvent }> \| undefined`      | Overrides inner contents of included theme tiles |

### ScheduleThemeStyle

| Property                  | Type                                                                                           | Description                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `root`                    | `CSSProperties \| undefined`                                                                   | Root element style                                                             |
| `dayLabels`               | `CSSProperties \| undefined`                                                                   | Style for day labels at the top of the schedule                                |
| `timeScaleLabels`         | `CSSProperties \| undefined`                                                                   | Style for time markers down the left side of the schedule                      |
| `eventTiles`              | `CSSProperties \| ((event: CalendarEvent,theme: ScheduleTheme) => CSSProperties) \| undefined` | Event tile style, or a function that returns a style given the event and theme |
| `majorGridlinesBorder`    | `CSSProperties["borderStyle"] \| undefined`                                                    | Major gridline border style                                                    |
| `minorGridlinesBorder`    | `CSSProperties["borderStyle"] \| undefined`                                                    | Minor gridline border style                                                    |
| `verticalGridlinesBorder` | `CSSProperties["borderStyle"] \| undefined`                                                    | Vertical gridline border style                                                 |

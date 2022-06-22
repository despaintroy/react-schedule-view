# React Schedule View

React Schedule View is a zero-dependency, fully customizable component for displaying schedules in a daily or week format.

This package is currently under development and should not be used until a 1.0 version is published.

![](./docs/images/screenshot.jpg)

## Example Usage

```javascript
...

const data: DaySchedule[] = [
  {
    name: "Today",
    events: [
      {
        startTime: 16,
        endTime: 18,
        title: "Check-in",
      },
      {
        startTime: 16.5,
        endTime: 17.75,
        title: "Dinner & Team Forming",
      },
      {
        startTime: 18,
        endTime: 18.75,
        title: "Opening Keynote",
      },
    ],
  },
];

...

return(<ScheduleView daySchedules={data} viewStartTime={15} viewEndTime={20} />)
```

![](./docs/images/screenshot-example.jpg)

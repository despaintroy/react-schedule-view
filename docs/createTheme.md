# createTheme

To create a custom theme, you can use the `createTheme` function to override attributes of one of the included themes.

`createTheme` is a function that takes two arguments: the theme to override, and a partial `ScheduleTheme` object with the attributes you want to override. The theme to override can be a string (`"apple"` or `"google"`), or a complete `CalendarTheme` object.

```typescript
const theme = createTheme("google", {
  defaultTileColor: "green",
  hourHeight: "50px",
  style: {
    dayLabels: {
      fontWeight: "bold",
    },
  },
});
```

```tsx
<ScheduleView theme={theme} ... />
```

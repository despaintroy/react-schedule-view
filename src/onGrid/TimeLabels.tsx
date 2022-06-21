import { FC, useContext } from "react";
import { ThemeContext } from "../ScheduleView";

export interface TimeLabelsProps {
  numHours: number;
  subdivisionsPerHour: number;
  viewStartTime: number;
}

const TimeLabels: FC<TimeLabelsProps> = (props) => {
  const { numHours, subdivisionsPerHour, viewStartTime } = props;

  const theme = useContext(ThemeContext);

  return (
    <>
      {new Array(numHours + 1).fill(0).map((_, i) => {
        return (
          <div
            key={i}
            style={{
              gridColumn: `1`,
              gridRow: `${i * subdivisionsPerHour + 2}`,
              textAlign: "right",
              paddingRight: "1rem",
              ...theme.timeScale.style,
            }}
          >
            <div style={{ position: "relative", top: "-0.6em" }}>
              {theme.timeScale.timeFormatter(viewStartTime + i)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TimeLabels;

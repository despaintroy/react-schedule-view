import { FC, useContext } from "react";
import { SUBDIVISIONS_PER_HOUR } from "../utils/models";
import { ThemeContext } from "../utils/themeContext";

export interface TimeLabelsProps {
  numHours: number;
  viewStartTime: number;
}

const TimeLabels: FC<TimeLabelsProps> = (props) => {
  const { numHours, viewStartTime } = props;

  const theme = useContext(ThemeContext);

  return (
    <>
      {new Array(numHours + 1).fill(0).map((_, i) => {
        return (
          <div
            key={i}
            style={{
              gridColumn: `1`,
              gridRow: `${i * SUBDIVISIONS_PER_HOUR + 2}`,
              textAlign: "right",
              paddingRight: "1rem",
              ...theme.style?.timeScaleLabels,
            }}
          >
            <div style={{ position: "relative", top: "-0.6em" }}>
              {theme.timeFormatter(viewStartTime + i)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TimeLabels;

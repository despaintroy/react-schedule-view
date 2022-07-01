import { FC, useContext } from "react";
import { ThemeContext } from "../utils/themeContext";

export interface DayLabelsProps {
  dayNames: string[];
}

const DayLabels: FC<DayLabelsProps> = (props) => {
  const { dayNames } = props;

  const theme = useContext(ThemeContext);

  return (
    <>
      {dayNames.map((dayName, i) => {
        return (
          <div
            key={i}
            style={{
              gridColumn: `${i + 2}`,
              gridRow: `1`,
              padding: "0.5rem",
              textAlign: "center",
              ...theme.style?.dayLabels,
            }}
          >
            {dayName}
          </div>
        );
      })}
    </>
  );
};

export default DayLabels;

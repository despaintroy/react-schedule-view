import { FC, useContext } from "react";
import { ThemeContext } from "../utils/themeContext";
import HorizontalLines from "./HorizontalLines";

export interface GridlinesProps {
  numHours: number;
  numDays: number;
}

const Gridlines: FC<GridlinesProps> = (props) => {
  const { numHours, numDays } = props;

  const theme = useContext(ThemeContext);

  const { subdivisionsPerHour, minorGridlinesPerHour, style } = theme;

  return (
    <>
      {/* Minor Gridlines */}
      {minorGridlinesPerHour > 0 && (
        <HorizontalLines
          numLines={numHours * minorGridlinesPerHour + 1}
          offset={1}
          spacing={subdivisionsPerHour / minorGridlinesPerHour - 1}
          borderStyle={style?.minorGridlinesBorder}
        />
      )}

      {/* Major Gridlines */}
      <HorizontalLines
        numLines={numHours + 1}
        offset={1}
        spacing={subdivisionsPerHour - 1}
        borderStyle={style?.majorGridlinesBorder}
      />

      {/* Vertical Lines */}
      {new Array(numDays - 1).fill(0).map((_, i) => {
        return (
          <div
            key={i}
            style={{
              gridColumn: `${i + 2}`,
              gridRow: `2 / span ${numHours * subdivisionsPerHour}`,
              borderRight: style?.verticalGridlinesBorder,
            }}
          />
        );
      })}
    </>
  );
};

export default Gridlines;

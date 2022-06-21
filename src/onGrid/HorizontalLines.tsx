import { CSSProperties, FC } from "react";

export interface HorizontalLinesProps {
  borderStyle: CSSProperties["borderStyle"];
  spacing: number;
  numLines: number;
  offset?: number;
}

const HorizontalLines: FC<HorizontalLinesProps> = (props) => {
  const { borderStyle, spacing, numLines, offset = 0 } = props;

  return (
    <>
      {new Array(numLines).fill(0).map((_, i) => {
        return (
          <div
            key={i}
            style={{
              gridColumn: `2 / -1`,
              gridRow: `${i * (Math.round(spacing) + 1) + offset + 1}`,
              borderTop: borderStyle,
            }}
          />
        );
      })}
    </>
  );
};

export default HorizontalLines;

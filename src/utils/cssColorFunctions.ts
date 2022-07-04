import { CSSProperties } from "react";
import { clamp } from "./helpers";

/**
 * Given a background color and two foreground color options, returns the
 * foreground color with the best contrast ratio to the background color.
 */
export const testContrast = (
  bg: CSSProperties["color"],
  fg1: CSSProperties["color"],
  fg2: CSSProperties["color"],
  skewReturnLighter: number = 0
): CSSProperties["color"] => {
  const bgLuminance = clamp(getLuminance(bg) - skewReturnLighter, 0, 1);
  const fg1Luminance = getLuminance(fg1);
  const fg2Luminance = getLuminance(fg2);

  const fg1Contrast = getContrast(bgLuminance, fg1Luminance);
  const fg2Contrast = getContrast(bgLuminance, fg2Luminance);

  return fg1Contrast > fg2Contrast ? fg1 : fg2;
};

/**
 * Returns the contrast ratio between two luminances
 */
export const getContrast = (
  bgLuminance: number,
  fgLuminance: number
): number => {
  return Math.abs(bgLuminance - fgLuminance);
};

/**
 * Returns the luminance value of a CSS color
 */
export const getLuminance = (color: CSSProperties["color"]): number => {
  const rgb = cssColorToRGB(color);
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const luminance = Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2);
  return luminance;
};

/**
 * Converts a CSS color string to RGB values
 */
export const cssColorToRGB = (color: CSSProperties["color"]): number[] => {
  const isBrowser = typeof window !== "undefined";

  if (!color || !isBrowser) return [0, 0, 0];

  var canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  var ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  var data = ctx.getImageData(0, 0, 1, 1).data;

  return [data[0], data[1], data[2]];
};

// https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/RGBToHSL.md
export const RGBToHSL = ([r, g, b]: number[]) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

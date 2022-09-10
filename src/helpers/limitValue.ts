export const getLimitedValue = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

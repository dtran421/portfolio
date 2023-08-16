export const isNullish = (value: unknown) => value === null || value === undefined;

export const truncateString = (str: string, maxLength = 50) =>
  `${str.substring(0, maxLength)}${str.length > maxLength ? "..." : ""}`;

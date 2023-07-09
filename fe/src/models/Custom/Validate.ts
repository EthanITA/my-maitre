export default {
  string: (value?: string): boolean => (value || "").trim().length > 0,
  number: (value?: number): boolean =>
    value !== undefined && value !== null && !isNaN(value),
  array: (value?: any[]): boolean =>
    (value || []).every((item) => !!(item ?? false)),
};

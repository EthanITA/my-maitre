export default {
  string: (value?: string): boolean => (value || "").trim().length > 0,
};

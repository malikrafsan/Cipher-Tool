const FORMAT_OPTIONS = {
  NO_SPACES: "Tanpa Spasi",
  WITH_5_SPACES: "Dengan 5 Spasi",
} as const;

type FormatOptionKeyType = keyof typeof FORMAT_OPTIONS;
type FormatOptionValType = typeof FORMAT_OPTIONS[FormatOptionKeyType];

export { FORMAT_OPTIONS, type FormatOptionKeyType, type FormatOptionValType };

// Single source of truth for every color in the app.
const palette = {
  teal: "#065758",
  tealDark: "#0C3F3F",
  mist: "#CDDDDE",
  mistTranslucent: "#A5C2C480",
  clay: "#BF6E65",
  gold: "#CFB991",
  red: "#DD5042",
  mint: "#77EBB7",
  ink: "#1D1D1D",
  gray: "#6B7280",
  grayLight: "#E5E7EB",
  white: "#FFFFFF",
  star: "#FFC83D",
};

const colors = {
  primary: palette.teal,
  primaryDark: palette.tealDark,
  secondary: palette.mist,
  secondaryDark: palette.mistTranslucent,
  accent: palette.clay,
  boilermakerGold: palette.gold,
  warning: palette.red,
  success: palette.mint,
  star: palette.star,

  background: palette.white,
  surface: palette.white,
  text: palette.ink,
  textMuted: palette.gray,
  textLight: palette.white,
  border: palette.grayLight,

  shadow: "#00000040",
  overlay: "#00000080",
  mapFill: "#06575850",
  mapStroke: palette.teal,
};

export default colors;

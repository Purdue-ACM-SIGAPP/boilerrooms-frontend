import colors from "./colors";

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 8,
  md: 15,
  lg: 25,
  pill: 999,
};

export const shadows = {
  none: {},
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const sizes = {
  iconSm: 18,
  iconMd: 24,
  iconLg: 32,
  iconXl: 64,
  touch: 44,
  avatar: 96,
  thumbnail: 88,
  contentMaxWidth: 640,
};

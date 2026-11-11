import { createGlobalTheme } from "@vanilla-extract/css";

export const colors = createGlobalTheme(":root", {
  primary: "#b22222",
});

export type Colors = typeof colors;

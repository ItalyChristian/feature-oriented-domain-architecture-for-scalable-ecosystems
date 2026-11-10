import { style, styleVariants } from "@vanilla-extract/css";

export const flex = style({
  display: "flex",
});

export const flexVariants = styleVariants({
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  column: {
    flexDirection: "column",
  },
  columnCentered: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

export const flexCenter = style([flex, flexVariants.centered]);
export const flexColumn = style([flex, flexVariants.column]);
export const flexColumnCenter = style([flex, flexVariants.columnCentered]);

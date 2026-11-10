import { style } from "@vanilla-extract/css";
import { colors } from "./colors.css";

export const card = style({
  padding: "20px 15px",
  background: "#181818",
  textAlign: "center",
  border: "1px solid #2a2a2a",
  borderRadius: 12,
  transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
  selectors: {
    "&:hover": {
      transform: "scale(1.02)",
      borderColor: colors.primary,
      boxShadow: "0 10px 25px rgba(178, 34, 34, 0.2)",
    },
  },
});

export const cardImage = style({
  maxWidth: "100%",
  height: "auto",
  padding: 10,
  marginBottom: 15,
  borderRadius: 6,
  background: "#252525",
});

export const cardTitle = style({
  marginBottom: 5,
  color: "#fff",
  fontSize: "1.1rem",
  fontWeight: 600,
});

export const cardBand = style({
  color: "#aaa",
  fontSize: "0.8rem",
});

export const cardPrice = style({
  display: "block",
  margin: "10px 0",
  color: colors.primary,
  fontSize: "1.5rem",
  fontWeight: "bold",
});

export const cardButton = style({
  padding: "8px 30px",
  color: colors.primary,
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: 1,
  border: `2px solid ${colors.primary}`,
  borderRadius: 30,
  background: "transparent",
  cursor: "pointer",
  transition: "0.3s",

  ":hover": {
    color: "#fff",
    background: colors.primary,
  },
});

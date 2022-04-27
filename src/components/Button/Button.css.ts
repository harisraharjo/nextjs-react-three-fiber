import { sprinkles } from "@styles/sprinkles.css";
import { style } from "@vanilla-extract/css";

export const buttonStyles = style([
  sprinkles({
    backgroundColor: {
      dark: "mauve1",
      light: "mauve1",
    },
    color: { dark: "mauve12", light: "mauve12" },
    transition: "background-color 1s",
  }),
]);

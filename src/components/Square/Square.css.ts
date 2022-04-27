import { style } from "@vanilla-extract/css";
import { sprinkles } from "@styles/sprinkles.css";

export const squareStyles = style([
  sprinkles({
    backgroundColor: {
      dark: "blackA12",
      light: "indigoA12",
    },
    transition: "background-color 1s",
  }),
]);

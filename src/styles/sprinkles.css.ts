import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { darkMode } from "./constants";
import { tokens } from "./tokens.css";

const ColorProps = defineProperties({
  conditions: {
    light: {},
    dark: { selector: `.${darkMode} &` },
  },
  defaultCondition: ["light", "dark"],
  properties: {
    backgroundColor: tokens.palette,
    color: tokens.palette,
  },
});

const props = defineProperties({
  properties: {
    display: ["none", "flex"],
    flex: [1],
    flexDirection: ["row", "column"],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-between",
    ],
    gap: [1, 2, 3],
    width: ["100vw", "100%"],
    height: ["100vh", "100%"],
    overflow: ["hidden"],
    textAlign: ["center"],
    transition: ["background-color 1s"],
  },
});

export const sprinkles = /*#__PURE__*/ createSprinkles(ColorProps, props);

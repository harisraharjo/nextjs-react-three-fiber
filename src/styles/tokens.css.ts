import { indigoA, mauveDark, blackA } from "./colors";
import { createGlobalTheme } from "@vanilla-extract/css";

const token = {
  font: {
    family: {
      untitled: "Untitled Sans, -apple-system, system-ui, sans-serif",
      mono: "Söhne Mono, menlo, monospace",
    },
  },
  palette: {
    ...indigoA,
    ...mauveDark,
    ...blackA,
    // error: "hsl(10, 82.0%, 43.5%)", //tomato.tomato11
    // warning: "hsl(39, 100%, 57.0%)", //amber.amber9
    // success: "hsl(168, 52.8%, 51.0%)", //mint.mint8
    // info: "hsla(211, 99.8%, 50.9%, 0.597)", //blueDarkA.blueA8,
    // panelContrast: "white",
    // shadow: mauveDark.mauve12,
    overlay: blackA.blackA8,
    panel: "white",
  },
};

export const tokens = createGlobalTheme(":root", token);

import { globalStyle } from "@vanilla-extract/css";
import { darkMode } from "./constants";
import { tokens } from "./tokens.css";

globalStyle("*, *::before, *::after ", {
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
});

globalStyle("#__next", {
  height: "100%",
});

globalStyle("#root, #__next", {
  isolation: "isolate",
});

globalStyle("html", {
  height: "100%",
  backgroundColor: tokens.palette.mauve12,
  transition: "background-color 1s",
  // color: tokens.palette.mauveA3,
});

globalStyle(`.${darkMode}`, {
  backgroundColor: tokens.palette.mauve2,
});

globalStyle("body", {
  height: "100%",
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
});

globalStyle("html:focus-within", {
  scrollBehavior: "smooth",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

globalStyle("img, picture, video, canvas, svg", {
  maxWidth: "100%",
  display: "block",
});

globalStyle("p, h1, h2, h3, h4, h5, h6", {
  overflowWrap: "break-word",
  hyphens: "auto",
});

globalStyle("ul[role='list'], ol[role='list']", {
  listStyle: "none",
});

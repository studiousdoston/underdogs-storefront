import { extendTheme } from "@mui/joy/styles";

export const theme = extendTheme({
  fontFamily: {
    body: "'Bebas Neue', sans-serif",
    display: "'Bebas Neue', sans-serif",
  },
  typography: {
    "body-md": {
      letterSpacing: "0.02em",
    },
    h1: { letterSpacing: "0.03em" },
    h2: { letterSpacing: "0.03em" },
    h3: { letterSpacing: "0.03em" },
    h4: { letterSpacing: "0.03em" },
    "title-lg": { letterSpacing: "0.03em" },
  },
});

import { createTheme } from "@mui/material/styles";

function Palette() {
  return createTheme({
    palette: {
      primary: {
        main: "#201C1C",
        dark: "#201C1C",
      },
      background: {
        main: "#F0ECEC",
      },
      white: {
        main: "#FFFFFF",
      },
      grey: {
        main: "#C5CCD4",
      },
      black: {
        main: "#000000",
      },
    },
  });
}

export default Palette;

import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Palette from "./palette";
import Typography from "./typography";

function ThemeCustomization({ children }) {
  const theme = useMemo(() => Palette(), []);
  const themeTypography = useMemo(() => Typography(), []);

  const themeOptions = useMemo(
    () => ({
      palette: theme.palette,
      //   mixins: {
      //     toolbar: {
      //       minHeight: "48px",
      //       padding: "16px",
      //       "@media (min-width: 600px)": {
      //         minHeight: "48px",
      //       },
      //     },
      //   },
      typography: themeTypography,
    }),
    [theme, themeTypography]
  );

  const themes = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default ThemeCustomization;

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};

ThemeCustomization.defaultProps = {
  children: null,
};

import PropTypes from "prop-types";
import React, { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
	ThemeProvider as MUIThemeProvider,
	createTheme,
	StyledEngineProvider,
} from "@mui/material/styles";
//
import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import customShadows from "./customShadows";
import componentsOverride from "./overrides";

// ----------------------------------------------------------------------

CustomThemeProvider.propTypes = {
	children: PropTypes.node,
};

/**
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The children prop.
 * @returns {JSX.Element} - The rendered CustomThemeProvider component.
 */

export default function CustomThemeProvider({ children }) {
	const themeOptions = useMemo(
		() => ({
			palette,
			shape: { borderRadius: 6 },
			typography,
			shadows: shadows(),
			customShadows: customShadows(),
		}),
		[]
	);

	const theme = createTheme(themeOptions);
	theme.components = componentsOverride(theme);

	return (
		<StyledEngineProvider injectFirst>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles />
				{children}
			</MUIThemeProvider>
		</StyledEngineProvider>
	);
}

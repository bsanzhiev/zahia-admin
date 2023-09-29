"use client";
import * as React from "react";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import CustomThemeProvider from "@/theme/index";

export default function ThemeRegistry({ children } : {children: React.ReactNode}) {
	return (
		<NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
			<CustomThemeProvider>{children}</CustomThemeProvider>
		</NextAppDirEmotionCacheProvider>
	);
}

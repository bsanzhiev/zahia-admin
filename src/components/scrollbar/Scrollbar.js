import { PropTypes } from "prop-types";
import { memo } from "react";
// @mui
import { Box } from "@mui/material";
// styles - is it appropriate?
import { StyledRootScrollbar, StyledScrollbar } from "./styles";

//--------------------------------------------------------------

Scrollbar.PropTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

function Scrollbar({ children, sx, ...other }) {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} cliclOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);

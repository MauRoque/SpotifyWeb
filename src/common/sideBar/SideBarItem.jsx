import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const sideBarItemStyle = {
  borderRadius: `1rem`,
  display: `flex`,
  alignItems: `center`,
  padding: `1rem`,
  "&:hover": {
    backgroundColor: "primary.main",
    color: "white.main",
  },
  "&.Mui-focused": {
    backgroundColor: "primary.main",
    color: "white.main",
  },
};

export default function SideBarItem({ title, onClick, to }) {
  return (
    <NavLink to={to} style={{ textDecoration: "none", width: "100%" }}>
      <Box sx={sideBarItemStyle} onClick={onClick} color={"primary.main"}>
        <Typography variant='h3_medium'>{title}</Typography>
      </Box>
    </NavLink>
  );
}

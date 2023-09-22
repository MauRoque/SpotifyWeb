import { Box, Typography } from "@mui/material";
import SideBarItem from "./SideBarItem";

const sideBarStyle = {
  backgroundColor: `white.main`,
  borderRadius: `16px`,
  display: `flex`,
  isolation: `isolate`,
  flexDirection: `column`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `32px 16px`,
  boxSizing: `border-box`,
  height: `100%`,
  left: `0px`,
  top: `0px`,
  width: `288px`,
  gap: `1rem`,
};

export default function SideBar() {
  return (
    <Box sx={sideBarStyle}>
      <Typography variant='h1_bold'>Spotyfi</Typography>
      <SideBarItem title='Artists' to='/' />
      <SideBarItem title='Songs' to='songs' />
      <SideBarItem title='Users' to='users' />
    </Box>
  );
}

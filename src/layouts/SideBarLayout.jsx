import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import SideBar from "../common/sideBar/SideBar";
import { audio } from "../services/AudioService";

audio.getInstance();

function SideBarLayout() {
  const [playing, setPlaying] = useState({
    isPlaying: false,
    songPath: null,
  });

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        height: "100%",
        backgroundColor: "background.main",
      }}
    >
      <Grid item xs='auto' sx={{ zIndex: "2", position: "sticky" }}>
        <SideBar />
      </Grid>
      <Grid item xs sx={{ height: "100vh" }}>
        <Box sx={{ height: "100vh" }}>
          <Outlet context={[playing, setPlaying]} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default SideBarLayout;

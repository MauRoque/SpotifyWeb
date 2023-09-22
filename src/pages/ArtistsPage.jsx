import { Box, Grid, Typography } from "@mui/material";
import ArtistCard from "../features/artists/ArtistCard";
import { useEffect, useState } from "react";
import ButtonSmall from "../common/button/ButtonSmall";
import AddArtistForm from "../features/artists/AddArtistForm";
import { refreshArtists } from "../utils/ArtistsUtils";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);

  useEffect(() => {
    refreshArtists(setArtists);
  }, []);

  return (
    <Grid container direction='column' padding={"2rem"}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant='h1_medium' color={"black.main"}>
          Artists
        </Typography>
        <ButtonSmall
          variant={"contained"}
          title='Add Artist'
          onClick={() => {
            setOpenAddForm(true);
          }}
        />
        <AddArtistForm
          open={openAddForm}
          setOpen={setOpenAddForm}
          artists={artists}
          setArtists={setArtists}
        />
      </Box>
      <Grid
        container
        sx={{
          padding: "1rem",
          display: "flex",
          borderRadius: "1rem",
          background: "white",
          marginTop: "1rem",
          gap: "1rem",
        }}
      >
        {artists?.map((artist, index) => (
          <Grid item key={`${artist.name}-${index}`}>
            <ArtistCard artist={artist} setArtists={setArtists} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

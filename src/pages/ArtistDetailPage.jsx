import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ButtonSmall from "../common/button/ButtonSmall";
import AddSongForm from "../features/songs/AddSongForm";
import SongCard from "../features/songs/SongCard";
import { useOutletContext, useParams } from "react-router-dom";
import { refreshArtist } from "../utils/ArtistsUtils";
// import { audio } from "../services/AudioService";

export default function ArtistDetailPage() {
  const [artist, setArtist] = useState({});
  const [open, setOpen] = useState(false);
  const { id: artistDocId } = useParams();
  const [playing, setPlaying] = useOutletContext();

  useEffect(() => {
    refreshArtist(artistDocId, setArtist);
  }, [artistDocId]);

  return (
    <Grid container direction='column' padding={"2rem"}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant='h1_medium' color={"black.main"}>
          {artist.name}
        </Typography>
        <ButtonSmall
          variant={"contained"}
          title='Add song'
          onClick={() => {
            setOpen(true);
          }}
        />
        <AddSongForm
          open={open}
          setOpen={setOpen}
          artist={artist}
          setArtist={setArtist}
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
        {artist.songs?.map((song, index) => (
          <Grid item key={`${song.name}-${index}`}>
            <SongCard
              song={song}
              // audio={audio}
              // playing={playing}
              setPlaying={setPlaying}
              playing={playing}
              artist={artist}
              setArtist={setArtist}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

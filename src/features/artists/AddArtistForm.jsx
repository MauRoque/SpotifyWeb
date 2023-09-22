import { TextField } from "@mui/material";
import FormDialog from "../../common/dialog/FormDialog";
import { createArtist } from "../../services/ArtistService";
import { useState } from "react";

export default function AddArtistForm({ open, setOpen, setArtists, artists }) {
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async () => {
    const artistData = {
      name: artistName,
      genre,
      songs: [],
    };

    const artist = await createArtist(artistData);

    setArtists([...artists, artist]);
  };

  return (
    <FormDialog
      title='Add Artist'
      handleSubmit={handleSubmit}
      open={open}
      setOpen={setOpen}
    >
      <TextField
        variant='outlined'
        label='Artist Name'
        color='primary'
        onChange={event => setArtistName(event.target.value)}
      />
      <TextField
        variant='outlined'
        label='Genre'
        color='primary'
        onChange={event => setGenre(event.target.value)}
      />
    </FormDialog>
  );
}

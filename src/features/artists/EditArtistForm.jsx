import { TextField } from "@mui/material";
import { useState } from "react";
import { updateArtist } from "../../services/ArtistService";
import { refreshArtists } from "../../utils/ArtistsUtils";
import FormDialog from "../../common/dialog/FormDialog";

export default function EditArtistForm({ open, setOpen, setArtists, artist }) {
  const [artistName, setArtistName] = useState(artist.name);
  const [genre, setGenre] = useState(artist.genre);

  const handleSubmit = async () => {
    const artistData = {
      name: artistName,
      genre,
    };

    await updateArtist(artist.artistDocId, artistData);

    refreshArtists(setArtists);
  };

  return (
    <FormDialog
      title='Edit Artist'
      handleSubmit={handleSubmit}
      open={open}
      setOpen={setOpen}
    >
      <TextField
        variant='outlined'
        label='Artist Name'
        color='primary'
        defaultValue={artistName}
        onChange={event => setArtistName(event.target.value)}
      />
      <TextField
        variant='outlined'
        label='Genre'
        color='primary'
        defaultValue={genre}
        onChange={event => setGenre(event.target.value)}
      />
    </FormDialog>
  );
}

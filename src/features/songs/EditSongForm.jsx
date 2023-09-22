import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { updateSong } from "../../services/SongService";
import { refreshArtist } from "../../utils/ArtistsUtils";
import { storage } from "../../firebase";
import FormDialog from "../../common/dialog/FormDialog";

export default function EditSongForm({
  open,
  setOpen,
  artist,
  setArtist,
  song,
}) {
  const [songName, setSongName] = useState(song.name);
  const [album, setAlbum] = useState(song.album);
  const [filePath, setFilePath] = useState(song.filePath);

  const handleSubmit = async () => {
    const songData = {
      name: songName,
      album,
      filePath,
    };

    await updateSong(song.songDocId, songData, song.filePath);

    refreshArtist(artist.artistDocId, setArtist);
  };

  const handleFileUpload = event => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    const filePathTmp = `songs/${songName}-${uuidv4()}`;
    setFilePath(filePathTmp);
    const storageRef = ref(storage, filePathTmp);

    uploadBytes(storageRef, file).then(snapshot => {
      console.log("Uploaded a blob or file!");
      console.log(snapshot);
    });
  };

  return (
    <FormDialog
      title='Edit Song'
      handleSubmit={handleSubmit}
      open={open}
      setOpen={setOpen}
    >
      <TextField
        variant='outlined'
        label='Song name'
        color='primary'
        defaultValue={song.name}
        onChange={event => setSongName(event.target.value)}
      />
      <TextField
        variant='outlined'
        label='Album'
        color='primary'
        defaultValue={song.album}
        onChange={event => setAlbum(event.target.value)}
      />
      <TextField
        type='file'
        inputProps={{ accept: "audio/*" }}
        onChange={handleFileUpload}
        color='primary'
      />
      <Typography variant={"h4"}>{filePath}</Typography>
    </FormDialog>
  );
}

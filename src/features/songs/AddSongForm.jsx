import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import FormDialog from "../../common/dialog/FormDialog";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase";
import { addSongToArtist } from "../../services/SongService";

export default function AddSongForm({ open, setOpen, artist, setArtist }) {
  const [songName, setSongName] = useState("");
  const [album, setAlbum] = useState("");
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");

  const handleSubmit = async () => {
    const songData = {
      name: songName,
      album,
      filePath,
    };

    const song = await addSongToArtist(artist.artistDocId, songData);

    setArtist({
      ...artist,
      songs: [...artist.songs, song],
    });
  };

  const handleFileUpload = event => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    const { name } = file;
    setFileName(name);

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
      title='Add Song'
      handleSubmit={handleSubmit}
      open={open}
      setOpen={setOpen}
    >
      <TextField
        variant='outlined'
        label='Song name'
        color='primary'
        onChange={event => setSongName(event.target.value)}
      />
      <TextField
        variant='outlined'
        label='Album'
        color='primary'
        onChange={event => setAlbum(event.target.value)}
      />
      {/* <Button
        component='label'
        variant='outlined'
        color='primary'
        sx={{ marginRight: "1rem" }}
      >
        <Typography variant={"h4"}>Upload song</Typography>
        <input type='file' hidden onChange={handleFileUpload} />
      </Button> */}
      {/* <input type='file' onChange={handleFileUpload} /> */}
      <TextField
        type='file'
        inputProps={{ accept: "audio/*" }}
        onChange={handleFileUpload}
        color='primary'
      />
      <Typography variant={"h4"}>{fileName}</Typography>
    </FormDialog>
  );
}

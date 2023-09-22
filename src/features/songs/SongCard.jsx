import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  IconPencil,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconTrashFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import EditSongForm from "./EditSongForm";
import { deleteSong } from "../../services/SongService";
import { refreshArtist } from "../../utils/ArtistsUtils";
import { audio } from "../../services/AudioService";

export default function SongCard({
  song,
  artist,
  setArtist,
  playing,
  setPlaying,
}) {
  const [open, setOpen] = useState(false);
  const formatedFilePath = song.filePath.replace("/", "%2F");
  const path = `https://firebasestorage.googleapis.com/v0/b/spotifymau-affcb.appspot.com/o/${formatedFilePath}?alt=media`;

  const iconStyle = {
    fontSize: "2.5rem",
  };

  const handleOpenEditForm = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    await deleteSong(song, artist.artistDocId);

    refreshArtist(artist.artistDocId, setArtist);
  };

  const handleClick = () => {
    audio.clickSong(path);

    if (playing.isPlaying && playing.songPath === path) {
      setPlaying({ isPlaying: false, songPath: null });
    } else {
      setPlaying({ isPlaying: true, songPath: path });
    }
  };

  useEffect(() => {
    audio.src = path;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component='img'
          height='192'
          width='192'
          image='https://static.thenounproject.com/png/1471435-200.png'
          alt='song photo'
        />
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant='h3_bold' color={"primary.main"}>
            {song.name}
          </Typography>
          <Typography variant='h3_medium' color={"grey.main"}>
            {song.album}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          aria-label='play/pause'
          color='primary'
          onClick={handleClick}
        >
          {playing.isPlaying && playing.songPath === path ? (
            <IconPlayerPauseFilled style={iconStyle} />
          ) : (
            <IconPlayerPlayFilled style={iconStyle} />
          )}
        </IconButton>
        {artist && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleOpenEditForm}>
              <IconPencil style={iconStyle} />
            </IconButton>
            <IconButton onClick={handleDelete} color='primary'>
              <IconTrashFilled style={iconStyle} />
            </IconButton>
          </Box>
        )}
      </Box>
      {artist && (
        <EditSongForm
          open={open}
          setOpen={setOpen}
          song={song}
          artist={artist}
          setArtist={setArtist}
        />
      )}
    </Card>
  );
}

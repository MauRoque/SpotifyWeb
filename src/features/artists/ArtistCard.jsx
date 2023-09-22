import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { IconPencil, IconTrashFilled } from "@tabler/icons-react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditArtistForm from "./EditArtistForm";
import { useState } from "react";
import { deleteArtist } from "../../services/ArtistService";
import { refreshArtists } from "../../utils/ArtistsUtils";

export default function ArtistCard({ artist, setArtists }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/artists/${artist.artistDocId}`);
  };

  const handleOpenEditForm = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    await deleteArtist(artist);
    await refreshArtists(setArtists);
  };

  const iconStyle = {
    fontSize: "2.5rem",
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component='img'
          height='192'
          width='192'
          image='https://djpunjab.is/images/artist-default-image.jpg'
          alt='artist photo'
        />
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant='h3_bold' color={"primary.main"}>
            {artist.name}
          </Typography>
          <Typography variant='h3_medium' color={"grey.main"}>
            {artist.genre}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={handleOpenEditForm}>
          <IconPencil style={iconStyle} />
        </IconButton>
        <IconButton onClick={handleDelete} color='primary'>
          <IconTrashFilled style={iconStyle} />
        </IconButton>
      </Box>
      <EditArtistForm
        open={open}
        setOpen={setOpen}
        setArtists={setArtists}
        artist={artist}
      />
    </Card>
  );
}

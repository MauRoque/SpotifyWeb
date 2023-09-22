import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getProfile } from "../services/ProfileService";
import { Grid, Typography } from "@mui/material";
import SongCard from "../features/songs/SongCard";

export default function UserDetailPage() {
  const [user, setUser] = useState({});
  const { id: userDocId } = useParams();
  const [playing, setPlaying] = useOutletContext();

  useEffect(() => {
    const getUser = async () => {
      const user = await getProfile(userDocId);
      setUser(user);
    };

    getUser();
  }, [userDocId]);

  return (
    <Grid container direction='column' padding={"2rem"}>
      <Typography variant='h1_medium' color={"black.main"}>
        {user.fullname}
      </Typography>
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
        {user.favoriteSongs?.map((song, index) => (
          <Grid item key={`${song.name}-${index}`}>
            <SongCard song={song} setPlaying={setPlaying} playing={playing} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

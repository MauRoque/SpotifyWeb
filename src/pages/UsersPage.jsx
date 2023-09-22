import { Grid, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import UserCard from "../features/users/UserCard";
import { getAllProfiles } from "../services/ProfileService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await getAllProfiles();
      setUsers(users);
    };

    getUsers();
  }, []);

  return (
    <Grid container direction='column' padding={"2rem"}>
      <Typography variant='h1_medium' color={"black.main"}>
        Users
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
        {users?.map((user, index) => (
          <Grid item key={`${user.fullname}-${index}`}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

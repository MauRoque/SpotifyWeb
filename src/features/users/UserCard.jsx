import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${user.userDocId}`);
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
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "12rem",
            overflowX: "hidden",
          }}
        >
          <Typography variant='h3_bold' color={"primary.main"}>
            {user.fullname}
          </Typography>
          <Typography variant='h3_medium' color={"grey.main"}>
            {user.email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

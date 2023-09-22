import { Button, Typography } from "@mui/material";

export default function ButtonCustom({
  variant,
  color,
  onClick,
  title,
  textVariant,
}) {
  return (
    <Button variant={variant} color={color} onClick={onClick}>
      <Typography variant={textVariant}>{title}</Typography>
    </Button>
  );
}

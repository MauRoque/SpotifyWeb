import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ButtonRegular from "../button/ButtonRegular";

export default function FormDialog({
  title,
  handleCancel = () => {},
  handleSubmit,
  children: fields,
  setOpen,
  open,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickCancel = () => {
    setOpen(false);
    handleCancel();
  };

  const handleClickSubmit = () => {
    setOpen(false);
    handleSubmit();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ padding: "2rem" }}>
      <DialogTitle>
        <Typography variant='h1_medium' color={"black.main"}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          margin: "2rem",
          overflow: "visible",
          width: "26rem",
        }}
      >
        {fields}
      </DialogContent>
      <DialogActions>
        <ButtonRegular
          onClick={handleClickCancel}
          title='Cancel'
          variant='outlined'
        />
        <ButtonRegular
          onClick={handleClickSubmit}
          title='Save'
          variant='contained'
        />
      </DialogActions>
    </Dialog>
  );
}

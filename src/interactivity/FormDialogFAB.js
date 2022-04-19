import { Box, Button, Dialog, DialogActions, Fab } from "@mui/material";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";

export default function FormDialogFAB({
  style,
  variant,
  color,
  text,
  children,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab
        size="large"
        variant={variant}
        color={color}
        aria-label="add"
        style={style}
        onClick={handleOpen}
      >
        <AddIcon />
        {text}
      </Fab>
      <Dialog open={open}>
        <Box>{children(handleClose)}</Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

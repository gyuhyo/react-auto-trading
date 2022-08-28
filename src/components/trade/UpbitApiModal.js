import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../../store/reducers/user";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function UpbitApiModal({ opened, setModalOpened }) {
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.user.auth);
  const [auth, setAuth] = useState({
    apiKey: userAuth.apiKey,
    secret: userAuth.secret,
  });

  const handleClose = () => {
    setModalOpened(false);
  };

  useEffect(() => {
    console.log(opened);
  }, [opened]);

  const handleAuthChange = (e) => {
    if (e.target.name === "apiKey") {
      setAuth((prevState) => {
        return { ...prevState, apiKey: e.target.value };
      });
    } else {
      setAuth((prevState) => {
        return { ...prevState, secret: e.target.value };
      });
    }
    console.log(auth);
  };

  const saveUserAuth = () => {
    dispatch(LOGIN({ auth: auth }));
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={opened}
      className="shadow-xl"
    >
      <BootstrapDialogTitle id="modal-title" onClose={handleClose}>
        업비트 API KEY 등록
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Stack className="gap-y-3 w-[540px]">
          <TextField
            name="apiKey"
            variant="outlined"
            label="API Key"
            size="small"
            onChange={handleAuthChange}
            value={auth.apiKey}
          />
          <TextField
            name="secret"
            variant="outlined"
            label="Secret Key"
            size="small"
            onChange={handleAuthChange}
            value={auth.secret}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={saveUserAuth}>저장</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

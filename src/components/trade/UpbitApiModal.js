import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../../store/reducers/user";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import { getToken } from "../../utils/hooks/common/cusAxios";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);

  const userAuth = useSelector((state) => state.user.auth);
  const [auth, setAuth] = useState({
    apiKey: userAuth.apiKey,
    secret: userAuth.secret,
  });

  useEffect(() => {
    setLoading(false);
  }, [opened]);

  const handleClose = () => {
    setModalOpened(false);
  };

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
  };

  const saveUserAuth = () => {
    setLoading(true);
    async function CheckAPIKey() {
      try {
        const response = await axios.get("/api/v1/accounts", {
          headers: {
            Authorization: getToken(auth),
            Accept: `application/json`,
          },
        });

        return response.data;
      } catch (error) {
        alert(error.response.data.error.message);
        return false;
      }
    }

    CheckAPIKey().then((result) => {
      if (result) {
        dispatch(LOGIN({ auth: auth }));
        setModalOpened(false);
      }
    });
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
        <LoadingButton
          size="small"
          color="secondary"
          startIcon={<SaveIcon />}
          loading={loading}
          loadingPosition="start"
          variant="contained"
          onClick={saveUserAuth}
        >
          저장
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  );
}

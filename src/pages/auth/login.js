import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../store/reducers/user";
import { useRouter } from "next/dist/client/router";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [auth, setAuth] = useState({ apiKey: null, secret: null });
  const transition = {
    delay: 0.5,
    x: { duration: 1 },
    default: { ease: "linear" },
  };

  const handleAuthSuccess = () => {
    dispatch(LOGIN({ auth }));
    router.push("/trading");
  };

  return (
    <motion.div transition={transition}>
      <Dialog open={true} variant="light">
        <DialogTitle>LOGIN</DialogTitle>
        <Divider />
        <DialogContent>
          <Alert severity="info">
            <Typography component="span">
              업비트에서 API 키를 발급 받으신 후 이용 가능합니다.
            </Typography>
          </Alert>
          <Stack component="form" className="mt-5 gap-y-5 w-[500px]">
            <TextField
              id="_upbitApiKey"
              label="UPBIT API ACCESS KEY"
              variant="standard"
              onChange={(e) => setAuth({ ...auth, apiKey: e.target.value })}
            />
            <TextField
              id="_upbitSecretKey"
              label="UPBIT API SECRET KEY"
              variant="standard"
              onChange={(e) => setAuth({ ...auth, secret: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="outlined" onClick={handleAuthSuccess}>
            Access
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => alert("로그인")}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

export default Login;

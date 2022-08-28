import { Alert, Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import UpbitApiModal from "./UpbitApiModal";

export default function AutoTradingContainer() {
  const [modalOpened, setModalOpened] = useState(false);
  const { apiKey, secret } = useSelector((state) => state.user.auth);

  const SignedUpbitApi = useCallback(() => {
    return (
      <Alert
        variant="filled"
        severity={!apiKey || !secret ? "error" : "success"}
        action={
          <Button
            variant="contained"
            color={!apiKey || !secret ? "error" : "success"}
            size="small"
            onClick={() => setModalOpened(true)}
          >
            API 키 등록
          </Button>
        }
      >
        업비트 API 키를 먼저 등록 해주세요.
      </Alert>
    );
  }, [apiKey, secret]);

  return (
    <div className="p-3">
      <UpbitApiModal opened={modalOpened} setModalOpened={setModalOpened} />
      <SignedUpbitApi setModalOpened={setModalOpened} />
    </div>
  );
}

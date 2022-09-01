import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paperWidthSm": {
    maxWidth: "none",
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

export default function TradingSettingModal({ opened, setModalOpened }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setModalOpened(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={opened}
      className="shadow-xl"
    >
      <BootstrapDialogTitle id="modal-title" onClose={handleClose}>
        AUTO TRADING SETTING
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <div className="flex flex-col gap-y-3 w-[600px]">
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">1회 매수 금액</p>
            <Divider size="small" orientation="vertical" flexItem />
            <TextField size="small" />
          </div>
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">RSI (매수 / 매도) 설정</p>
            <Divider size="small" orientation="vertical" flexItem />
            <TextField size="small" />
          </div>
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">자동 매도 방식</p>
            <Divider size="small" orientation="vertical" flexItem />
            <TextField size="small" />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          저장
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

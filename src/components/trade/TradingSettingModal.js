import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import { debounce } from "lodash";
import { CHANGE_TRADE_SETTING } from "../../store/reducers/trading";

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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function TradingSettingModal({ opened, setModalOpened }) {
  const dispatch = useDispatch();
  const globalSetting = useSelector((state) => state.trading.setting);
  const [setting, setSetting] = useState(globalSetting);

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleSave = () => {
    dispatch(CHANGE_TRADE_SETTING(setting));
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
        <div className="flex flex-col gap-y-3 w-[700px]">
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">1회 매수 금액</p>
            <Divider size="small" orientation="vertical" flexItem />
            <TextField
              size="small"
              className="w-[200px]"
              autoFocus
              value={setting.onePrice}
              onChange={(e) =>
                setSetting((state) => ({
                  ...state,
                  onePrice: Number(e.target.value),
                }))
              }
            />
            <p> 원</p>
          </div>
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">RSI (매수 / 매도) 설정</p>
            <Divider size="small" orientation="vertical" flexItem />
            <TextField
              size="small"
              className="w-[70px]"
              sx={{ "& .MuiInputBase-input": { textAlign: "center" } }}
              value={setting.rsiBid}
              onChange={(e) =>
                setSetting((state) => ({
                  ...state,
                  rsiBid: Number(e.target.value),
                }))
              }
            />{" "}
            <p>미만일 때 매수</p>
            <TextField
              size="small"
              className="w-[70px]"
              sx={{ "& .MuiInputBase-input": { textAlign: "center" } }}
              value={setting.rsiAsk}
              onChange={(e) =>
                setSetting((state) => ({
                  ...state,
                  rsiAsk: Number(e.target.value),
                }))
              }
            />
            <p>초과일 때 매도</p>
          </div>
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">매수 검색 거래량 상위</p>
            <Divider size="small" orientation="vertical" flexItem />
            <TextField
              size="small"
              className="w-[200px]"
              autoFocus
              value={setting.coinTop || 20}
              onChange={(e) =>
                setSetting((state) => ({
                  ...state,
                  coinTop: Number(e.target.value),
                }))
              }
            />
            <p> 개</p>
          </div>
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">자동 매도 방식</p>
            <Divider size="small" orientation="vertical" flexItem />
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                flexWrap: "wrap",
              }}
            >
              <StyledToggleButtonGroup
                size="small"
                value={setting.autoAskType || "rsi"}
                exclusive
                onChange={(e) =>
                  setSetting((state) => ({
                    ...state,
                    autoAskType: e.target.value,
                  }))
                }
              >
                <ToggleButton value="rsi">RSI 기준</ToggleButton>
                <ToggleButton value="per">특정 수익률 기준</ToggleButton>
                <ToggleButton value="rsiPer">
                  RSI or 특정수익률 기준
                </ToggleButton>
                {/*<ToggleButton value="macd">RSI 범위 내 MACD CROSS</ToggleButton>*/}
              </StyledToggleButtonGroup>
            </Paper>
          </div>
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">익절 매도 설정</p>
            <Divider size="small" orientation="vertical" flexItem />
            <p>수익률</p>
            {" ＋"}
            <TextField
              size="small"
              className="w-[70px]"
              sx={{ "& .MuiInputBase-input": { textAlign: "center" } }}
              value={setting.askUpPer}
              onChange={(e) =>
                setSetting((state) => ({
                  ...state,
                  askUpPer: Number(e.target.value),
                }))
              }
            />{" "}
            <p> % 초과일 때 매도</p>
          </div>
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">손절 매도 설정</p>
            <Divider size="small" orientation="vertical" flexItem />
            <p>수익률</p>
            {" －"}
            <TextField
              size="small"
              className="w-[70px]"
              sx={{ "& .MuiInputBase-input": { textAlign: "center" } }}
              value={setting.askDownPer * -1}
              onChange={(e) =>
                setSetting((state) => ({
                  ...state,
                  askDownPer: Number(e.target.value) * -1,
                }))
              }
            />{" "}
            <p> % 미만일 때 매도</p>
          </div>
          <div className="flex-1 flex flex-rows gap-x-3 items-center">
            <p className="w-[170px]">탐색 기준 시간</p>
            <Divider size="small" orientation="vertical" flexItem />
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                flexWrap: "wrap",
              }}
            >
              <StyledToggleButtonGroup
                size="small"
                value={setting.searchTime || "5"}
                exclusive
                onChange={(e) =>
                  setSetting((state) => ({
                    ...state,
                    searchTime: e.target.value,
                  }))
                }
              >
                <ToggleButton value="1">1분</ToggleButton>
                <ToggleButton value="3">3분</ToggleButton>
                <ToggleButton value="5">5분</ToggleButton>
                <ToggleButton value="10">10분</ToggleButton>
                <ToggleButton value="15">15분</ToggleButton>
                <ToggleButton value="30">30분</ToggleButton>
                <ToggleButton value="60">60분</ToggleButton>
                <ToggleButton value="240">240분</ToggleButton>
                <ToggleButton value="1d">1일</ToggleButton>
                <ToggleButton value="1w">1주</ToggleButton>
                <ToggleButton value="1m">1달</ToggleButton>
                {/*<ToggleButton value="macd">RSI 범위 내 MACD CROSS</ToggleButton>*/}
              </StyledToggleButtonGroup>
            </Paper>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={handleSave}
        >
          저장
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

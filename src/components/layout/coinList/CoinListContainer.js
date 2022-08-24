import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import useCoinList from "../../../utils/hooks/useCoinList";
import SubjectBar from "../SubjectBar";
import CoinRow from "./CoinRow";

function CoinListContainer() {
  const realtimeData = useSelector((state) => state.coin.realtimeData.data);
  const markets = useSelector((state) => state.coin.market.data);
  useCoinList();

  let sortedData = useCallback(() => {
    let copyData = realtimeData && [...realtimeData];
    return (
      copyData &&
      copyData.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h)
    );
  }, [realtimeData]);

  return (
    <TableContainer
      elevation={3}
      component={Paper}
      className="sticky top-[20px] flex-none min-w-[300px] max-w-[550px] h-[calc(100vh_-_110px)] bg-white"
      id="custom_scroll"
    >
      <SubjectBar text="업비트 시세" />
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="pt-5">
              코인명
            </TableCell>
            <TableCell align="center" className="pt-5">
              현재가
            </TableCell>
            <TableCell align="center" className="pt-5">
              전일대비
            </TableCell>
            <TableCell align="center" className="pt-5">
              거래대금
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData() &&
            sortedData().map((coin) => (
              <CoinRow
                key={coin?.code}
                data={coin}
                name={
                  markets.filter((list) => list.market === coin.code)[0]
                    .korean_name
                }
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(CoinListContainer);

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CLEAR_SUMMARY_DATA } from "../../store/reducers/coin";

export default function useClearSummary(clearTime) {
  const dispatch = useDispatch();

  useEffect(() => {
    const startClearTimer = setInterval(() => {
      const date = new Date();
      if (clearTime === 60) {
        if (
          Number(date.getMinutes()) === 0 &&
          Number(date.getSeconds()) === 0
        ) {
          dispatch(CLEAR_SUMMARY_DATA());
        }
      } else {
        if (
          Number(date.getMinutes()) % clearTime === 0 &&
          Number(date.getSeconds()) === 0
        ) {
          dispatch(CLEAR_SUMMARY_DATA());
        }
      }
    }, 1000);

    return () => clearInterval(startClearTimer);
  }, []);

  return null;
}

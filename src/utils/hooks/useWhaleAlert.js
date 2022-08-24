import axios from "axios";
import produce from "immer";
import React, { useCallback, useEffect, useState } from "react";

export default function useWhaleAlert() {
  const [whaleData, setWhaleData] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const getWhaleData = async () => {
          const response = await axios.get(
            "http://localhost:8080/https://api.whale-alert.io/feed.csv"
          );

          const result = response.data.split(/\r?\n/);

          result.forEach((data) => {
            const dataArr = data.split(",");
            const date = new Date(dataArr[1] * 1000);
            const jsonData = {
              key: dataArr[0],
              time:
                date.getHours() +
                ":" +
                (date.getMinutes().toString().length < 2
                  ? "0" + date.getMinutes()
                  : date.getMinutes()) +
                ":" +
                (date.getSeconds().toString().length < 2
                  ? "0" + date.getSeconds()
                  : date.getSeconds()),
              coin: dataArr[2],
              price: dataArr[3],
              usd: dataArr[4],
              type: dataArr[5],
              from: dataArr[6],
              fromType: dataArr[7],
              to: dataArr[8],
              toType: dataArr[9],
            };

            setWhaleData(
              produce((draft) => {
                draft.push(jsonData);
              })
            );
          });
        };

        getWhaleData();
      } catch (e) {
        console.error(e);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const postWhaleUniqueData = useCallback(() => {
    return whaleData.reduce((acc, current) => {
      if (acc.findIndex(({ key }) => key === current.key) === -1) {
        acc.push(current);
      }
      return acc;
    }, []);
  }, [whaleData]);

  return postWhaleUniqueData();
}

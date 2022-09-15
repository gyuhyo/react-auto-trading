import axios from "axios";
import { getToken } from "./cusAxios";

let _key = {};

function sleep() {
  return new Promise((r) => setTimeout(r, 300));
}

export default function ordersCoin(key, coinSignal, onePrice, account = null) {
  _key = key;

  for (let data in coinSignal.bid) {
    const body = {
      market: data.code,
      side: "bid",
      volume: (Math.floor((onePrice / data.price) * 100000000) / 100000000)
        .toFixed(8)
        .toString(),
      price: data.price.toString(),
      ord_type: "limit",
    };

    orders(body, _key);
    sleep();
  }

  coinSignal.ask?.forEach((data) => {
    const myCoin = account.filter((x) => data.code === x.code);

    if (myCoin.length > 0) {
      const body = {
        market: data.code,
        side: "ask",
        volume: myCoin[0].balance.toString(),
        price: data.price.toString(),
        ord_type: "limit",
      };

      orders(body, _key);
    }
  });
}

export function orders(body, keyy) {
  const options = {
    method: "POST",
    url: "/api/v1/orders",
    headers: {
      Accept: `application/json; charset=utf-8`,
      "Content-Type": "application/json; charset=utf-8",
      Authorization: getToken(keyy, body),
    },
    data: body,
  };

  new Promise((success) => {
    axios
      .request(options)
      .then(function (response) {
        success(response.data);
      })
      .catch(function (error) {
        success(error);
      });
  });
}

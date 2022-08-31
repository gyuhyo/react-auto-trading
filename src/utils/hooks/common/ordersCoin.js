import axios from "axios";
import { getToken } from "./cusAxios";

const key = {
  apiKey: "VnoQQa49yi0o39ve4nnlRMGWVauAHrP5jRMYkars",
  secret: "wIUq0ROHbT50HCKDFgBvd2bf96GOqvjXd7PQzsOE",
};

export default function ordersCoin(coinSignal, account) {
  coinSignal.bid.forEach((data) => {
    const body = {
      market: data.code,
      side: "bid",
      volume: (Math.floor((10000 / data.price) * 100000000) / 100000000)
        .toFixed(8)
        .toString(),
      price: data.price.toString(),
      ord_type: "limit",
    };

    orders(body);
  });

  coinSignal.ask.forEach((data) => {
    const myCoin = account.filter((x) => data.code === "KRW-" + x.currency);

    if (myCoin.length > 0) {
      const body = {
        market: data.code,
        side: "ask",
        volume: myCoin[0].balance.toString(),
        price: data.price.toString(),
        ord_type: "limit",
      };

      orders(body);
    }
  });
}

function orders(body) {
  const options = {
    method: "POST",
    url: "/api/v1/orders",
    headers: {
      Accept: `application/json; charset=utf-8`,
      "Content-Type": "application/json; charset=utf-8",
      Authorization: getToken(key, body),
    },
    data: body,
  };

  new Promise((success) => {
    axios
      .request(options)
      .then(function (response) {
        success(console.log(response.data));
      })
      .catch(function (error) {
        success(console.log(error));
      });
  });
}

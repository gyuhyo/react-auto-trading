import axios from "axios";

export default function searchCoin(markets) {
  const result = {
    bid: [],
    ask: [],
  };

  const resultRsi = {
    rsi14: 0,
    rsi28: 0,
  };

  const Call = () =>
    new Promise(async (resolve) => {
      for (const v of markets) {
        const CallAsyncAxios = () =>
          new Promise(async (success) => {
            const response = await axios.get(
              `https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.${v.market}&count=400`
            );
            success(response);
          });

        CallAsyncAxios().then((response) => {
          const closes = response.data.reverse().map((data) => data.tradePrice);

          [14, 28].forEach((term) => {
            const difference = [];
            const u = [];
            const d = [];
            const aus = [];
            const ads = [];
            const rss = [];
            const rsi = [];

            difference.push(0);
            closes.reduce((prev, current) => {
              difference.push(current - prev);
              return current;
            });

            difference.forEach((v) => {
              u.push(v > 0 ? v : 0.0);
              d.push(v < 0 ? v * -1 : 0.0);
            });

            aus.push(
              [...u].splice(i, term).reduce((prev, curr) => {
                return prev + curr;
              }, 0) / term
            );

            ads.push(
              [...d].splice(i, term).reduce((prev, curr) => {
                return prev + curr;
              }, 0) / term
            );

            for (var i = term; i < difference.length; i++) {
              const rsAU = (aus[i - term] * (term - 1) + u[i]) / term;
              aus.push(rsAU);

              const rsAD = (ads[i - term] * (term - 1) + d[i]) / term;
              ads.push(rsAD);

              rsi.push((100 * rsAU) / (rsAU + rsAD));
            }

            resultRsi["rsi" + term] = rsi[rsi.length - 1].toFixed(2);
          });

          if (resultRsi.rsi14 >= 70 && resultRsi.rsi28 >= 70) {
            result.ask.push({
              code: v.market,
              price: parseFloat(closes[closes.length - 1]),
              rsi14: resultRsi.rsi14,
              rsi28: resultRsi.rsi28,
            });
          }

          if (resultRsi.rsi14 <= 30 && resultRsi.rsi28 <= 30) {
            result.bid.push({
              code: v.market,
              price: parseFloat(closes[closes.length - 1]),
              rsi14: resultRsi.rsi14,
              rsi28: resultRsi.rsi28,
            });
          }
        });
      }

      setTimeout(() => {
        resolve();
      }, 3000);
    });

  return Call().then(() => {
    return result;
  });
}

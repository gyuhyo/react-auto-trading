import axios from "axios";

export default function searchCoin(markets, setRsi, time) {
  const result = {
    bid: [],
    ask: [],
  };

  const resultRsi = {
    rsi14: 0,
    rsi28: 0,
  };

  function sleep() {
    let ms = 0;

    if (markets.length >= 100) {
      ms = 200;
    } else if (markets.length >= 70) {
      ms = 215;
    } else if (markets.length >= 50) {
      ms = 200;
    } else if (markets.length >= 30) {
      ms = 230;
    } else {
      ms = 200;
    }
    return new Promise((r) => setTimeout(r, ms));
  }

  const Call = () =>
    new Promise(async (resolve) => {
      for (const market of markets) {
        await sleep().then(() => {
          const CallAsyncAxios = () =>
            new Promise(async (success) => {
              let url = "";
              if (time === "1d") {
                url = `https://crix-api-endpoint.upbit.com/v1/crix/candles/days?code=CRIX.UPBIT.${market}&count=400`;
              } else if (time === "1w") {
                url = `https://crix-api-endpoint.upbit.com/v1/crix/candles/weeks?code=CRIX.UPBIT.${market}&count=400`;
              } else if (time === "1m") {
                url = `https://crix-api-endpoint.upbit.com/v1/crix/candles/months?code=CRIX.UPBIT.${market}&count=400`;
              } else {
                url = `https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/${time}?code=CRIX.UPBIT.${market}&count=400`;
              }
              const response = await axios.get(url);
              success(response);
            });

          CallAsyncAxios().then((response) => {
            const closes = response.data
              .reverse()
              .map((data) => data.tradePrice);

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

              resultRsi["rsi" + term] = rsi[rsi.length - 2].toFixed(2);
            });

            if (
              resultRsi.rsi14 >= setRsi.rsiAsk &&
              resultRsi.rsi28 >= setRsi.rsiAsk
            ) {
              result.ask.push({
                code: market,
                price: parseFloat(closes[closes.length - 1]),
                rsi14: resultRsi.rsi14,
                rsi28: resultRsi.rsi28,
              });
            }

            if (
              resultRsi.rsi14 <= setRsi.rsiBid &&
              resultRsi.rsi28 <= setRsi.rsiBid
            ) {
              result.bid.push({
                code: market,
                price: parseFloat(closes[closes.length - 1]),
                rsi14: resultRsi.rsi14,
                rsi28: resultRsi.rsi28,
              });
            }
          });
        });
      }

      await setTimeout(() => {
        resolve();
      }, 1500);
    });

  return Call().then(() => {
    return result;
  });
}

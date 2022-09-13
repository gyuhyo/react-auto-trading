import Script from "next/script";
import { useEffect, useLayoutEffect, useRef } from "react";

export default function Chart({ Exchange, Ticker }) {
  const myRef = useRef();

  useLayoutEffect(() => {
    setTimeout(() => {
      const script = document.createElement("script");
      script.innerHTML = `new TradingView.widget({
                "width": "100%",
                "height": 416,
                "symbol": "BINANCE:BTCUSDT",
                "interval": "1",
                "timezone": "Asia/Seoul",
                "theme": "dark",
                "style": "1",
                "locale": "kr",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_d0524"});`;
      myRef.current.appendChild(script);
    }, 1000);
  }, []);
  const wrapperStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <div
        className="tradingview-widget-container"
        style={wrapperStyle}
        ref={myRef}
      >
        <div id="tradingview_d0524"></div>
        <Script type="text/javascript" src="https://s3.tradingview.com/tv.js" />
      </div>
    </>
  );
}

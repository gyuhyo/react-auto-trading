import Script from "next/script";
import React, { useEffect, useLayoutEffect, useRef } from "react";

function Chart({ watchList }) {
  const myRef = useRef();

  useLayoutEffect(() => {
    setTimeout(() => {
      const script = document.createElement("script");
      script.innerHTML = `new TradingView.widget({
                "autosize": true,
                "symbol": "UPBIT:BTCKRW",
                "interval": "5",
                "timezone": "Asia/Seoul",
                "theme": "dark",
                "style": "1",
                "locale": "kr",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "hide_top_toolbar": false,
                "hide_side_toolbar": false,
                "allow_symbol_change": false,
                "save_image": false,
                "details": false,
                "hotlist": false,
                "calendar": false,
                "studies": [
                  "BB@tv-basicstudies",
                  "MASimple@tv-basicstudies",
                  "PivotPointsHighLow@tv-basicstudies",
                  "RSI@tv-basicstudies"
                ],
                "height": "100%",
                "width": "100%",
                "watchlist": [
                  "BINANCE:BTCUSDT",
                  "UPBIT:BTCKRW",
                  "UPBIT:ETHKRW",
                  "UPBIT:NEOKRW",
                  "UPBIT:MTLKRW",
                  "UPBIT:XRPKRW",
                  "UPBIT:ETCKRW",
                  "UPBIT:OMGKRW",
                  "UPBIT:SNTKRW",
                  "UPBIT:WAVESKRW",
                  "UPBIT:XEMKRW",
                  "UPBIT:QTUMKRW",
                  "UPBIT:LSKKRW",
                  "UPBIT:STEEMKRW",
                  "UPBIT:XLMKRW",
                  "UPBIT:ARDRKRW",
                  "UPBIT:ARKKRW",
                  "UPBIT:STORJKRW",
                  "UPBIT:GRSKRW",
                  "UPBIT:REPKRW",
                  "UPBIT:ADAKRW",
                  "UPBIT:SBDKRW",
                  "UPBIT:POWRKRW",
                  "UPBIT:BTGKRW",
                  "UPBIT:ICXKRW",
                  "UPBIT:EOSKRW",
                  "UPBIT:TRXKRW",
                  "UPBIT:SCKRW",
                  "UPBIT:ONTKRW",
                  "UPBIT:ZILKRW",
                  "UPBIT:POLYKRW",
                  "UPBIT:ZRXKRW",
                  "UPBIT:LOOMKRW",
                  "UPBIT:BCHKRW",
                  "UPBIT:BATKRW",
                  "UPBIT:IOSTKRW",
                  "UPBIT:RFRKRW",
                  "UPBIT:CVCKRW",
                  "UPBIT:IQKRW",
                  "UPBIT:IOTAKRW",
                  "UPBIT:MFTKRW",
                  "UPBIT:ONGKRW",
                  "UPBIT:GASKRW",
                  "UPBIT:UPPKRW",
                  "UPBIT:ELFKRW",
                  "UPBIT:KNCKRW",
                  "UPBIT:BSVKRW",
                  "UPBIT:THETAKRW",
                  "UPBIT:QKCKRW",
                  "UPBIT:BTTKRW",
                  "UPBIT:MOCKRW",
                  "UPBIT:ENJKRW",
                  "UPBIT:TFUELKRW",
                  "UPBIT:MANAKRW",
                  "UPBIT:ANKRKRW",
                  "UPBIT:AERGOKRW",
                  "UPBIT:ATOMKRW",
                  "UPBIT:TTKRW",
                  "UPBIT:CREKRW",
                  "UPBIT:MBLKRW",
                  "UPBIT:WAXPKRW",
                  "UPBIT:HBARKRW",
                  "UPBIT:MEDKRW",
                  "UPBIT:MLKKRW",
                  "UPBIT:STPTKRW",
                  "UPBIT:ORBSKRW",
                  "UPBIT:VETKRW",
                  "UPBIT:CHZKRW",
                  "UPBIT:STMXKRW",
                  "UPBIT:DKAKRW",
                  "UPBIT:HIVEKRW",
                  "UPBIT:KAVAKRW",
                  "UPBIT:AHTKRW",
                  "UPBIT:LINKKRW",
                  "UPBIT:XTZKRW",
                  "UPBIT:BORAKRW",
                  "UPBIT:JSTKRW",
                  "UPBIT:CROKRW",
                  "UPBIT:TONKRW",
                  "UPBIT:SXPKRW",
                  "UPBIT:HUNTKRW",
                  "UPBIT:PLAKRW",
                  "UPBIT:DOTKRW",
                  "UPBIT:SRMKRW",
                  "UPBIT:MVLKRW",
                  "UPBIT:STRAXKRW",
                  "UPBIT:AQTKRW",
                  "UPBIT:GLMKRW",
                  "UPBIT:SSXKRW",
                  "UPBIT:METAKRW",
                  "UPBIT:FCT2KRW",
                  "UPBIT:CBKKRW",
                  "UPBIT:SANDKRW",
                  "UPBIT:HUMKRW",
                  "UPBIT:DOGEKRW",
                  "UPBIT:STRKKRW",
                  "UPBIT:PUNDIXKRW",
                  "UPBIT:FLOWKRW",
                  "UPBIT:DAWNKRW",
                  "UPBIT:AXSKRW",
                  "UPBIT:STXKRW",
                  "UPBIT:XECKRW",
                  "UPBIT:SOLKRW",
                  "UPBIT:MATICKRW",
                  "UPBIT:NUKRW",
                  "UPBIT:AAVEKRW",
                  "UPBIT:1INCHKRW",
                  "UPBIT:ALGOKRW",
                  "UPBIT:NEARKRW",
                  "UPBIT:WEMIXKRW",
                  "UPBIT:AVAXKRW",
                  "UPBIT:TKRW",
                  "UPBIT:CELOKRW",
                  "UPBIT:GMTKRW"
                ],
                "container_id": "tradingview_f64f6"
              });`;
      myRef.current.appendChild(script);
    }, 1000);
  }, []);
  const wrapperStyle = {
    width: "100%",
    maxHeight: "100%",
  };
  return (
    <>
      <div
        className="tradingview-widget-container"
        style={wrapperStyle}
        ref={myRef}
      >
        <div id="tradingview_f64f6"></div>
        <Script type="text/javascript" src="https://s3.tradingview.com/tv.js" />
      </div>
    </>
  );
}

export default React.memo(Chart);

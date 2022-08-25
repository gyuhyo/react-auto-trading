import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function document() {
  return (
    <Html>
      <Head>
        <base href="/" />
        <title>Mr.Park - WHALE ALERT</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

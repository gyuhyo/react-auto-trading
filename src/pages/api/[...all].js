import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default (req, res) =>
  httpProxyMiddleware(req, res, {
    target: "https://api.upbit.com",
    pathRewrite: [
      {
        patternStr: "^/api",
        replaceStr: "",
      },
    ],
  });

import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    externalResolver: true,
  },
};
export default (req, res) => (
    isDevelopment ?
        httpProxyMiddleware(req, res, {
            target: "https://api.upbit.com",
            changeOrigin: true,
            pathRewrite: [
            {
                patternStr: "^/api",
                replaceStr: "",
            },
            ],
        })
        :
)

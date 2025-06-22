import proxy from "express-http-proxy";
import { config } from "../config/env";
import { proxyOptions } from "../config/proxy";
import { logger } from "../utils/logger.util";

const authServiceProxy = () => {
  return proxy(config.AUTH_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers = {
        ...(proxyReqOpts.headers || {}),
        "Content-Type": "application/json",
      };

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info("Response recieved from auth service", {
        statusCode: proxyRes.statusCode,
      });
      return proxyResData;
    },
  });
};

export { authServiceProxy };

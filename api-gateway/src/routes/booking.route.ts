import proxy from "express-http-proxy";
import { config } from "../config/env";
import { proxyOptions } from "../config/proxy";
import { logger } from "../utils/logger.util";
import { IAuthRequest } from "../types";

const bookingServiceProxy = () => {
  return proxy(config.BOOKING_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts,  srcReq: IAuthRequest) => {
      proxyReqOpts.headers = {
        ...(proxyReqOpts.headers || {}),
        "Content-Type": "application/json",
        "x-user-id": srcReq.user?.id
      };

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info("Response recieved from booking service", {
        statusCode: proxyRes.statusCode,
      });
      return proxyResData;
    },
  });
};

export { bookingServiceProxy };

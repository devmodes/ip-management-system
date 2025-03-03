import express, { Request, Response, type Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { rateLimitAndTimeout } from "@middlewares/rateLimiter.middleware";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authMiddleware } from "@middlewares/auth.middleware";
const services = require("./services.json");

const port = 3001;
const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.disable("x-powered-by");

app.use(rateLimitAndTimeout);
app.use(authMiddleware);

services.forEach(({ route, target }: { route: string; target: string }) => {
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
  };

  app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});

app.listen(port, () => console.log(`API Gateway is running at port: ${port}`));

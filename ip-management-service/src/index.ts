import express, { type Express } from "express";
import cors from "cors";
import config from "@utils/config";
import router from "@routes/index";
import { errorsMiddleware } from "@middlewares/errors.middleware";
import { successMiddleware } from "@middlewares/success.middleware";

const PORT = config("app.port");

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(successMiddleware);
app.use(errorsMiddleware);

app.listen(PORT, () => console.log(`Service is running at port: ${PORT}`));

const express = require("express");
import cors from "cors";
const usersRouter = require("../Routes/usersRouter");
const { errorHandler } = require("/home/user/aux/library-api-Render/functions/error-handler.ts");

const {getEndpoints} = require("./Controllers/usersControllers")

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/users", usersRouter);
app.route("/api/endpoints").get(getEndpoints);

app.use(errorHandler);

export { app };

// export const api = functions.https.onRequest(app);

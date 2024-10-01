const express = require("express");
import cors from "cors";
const usersRouter = require("../Routes/usersRouter");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/users", usersRouter);

export { app };

// export const api = functions.https.onRequest(app);

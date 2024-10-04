"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const cors_1 = __importDefault(require("cors"));
const usersRouter = require("../Routes/usersRouter");
const { errorHandler } = require("../error-handler");
const { getEndpoints } = require("../Controllers/usersControllers");
const app = express();
exports.app = app;
app.use((0, cors_1.default)({ origin: true }));
app.use(express.json());
app.use("/api/users", usersRouter);
app.route("/api/endpoints").get(getEndpoints);
app.use(errorHandler);
// export const api = functions.https.onRequest(app);

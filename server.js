import express from "express";

import dotenv from "dotenv";
import bodyParser from "body-parser";

// import { notfound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log("Server running in port 4000"));

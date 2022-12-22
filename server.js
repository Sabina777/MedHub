import express from "express";

import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import path from "path";
import morgan from "morgan";
import colors from "colors";

// import { notfound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running in port 5000"));

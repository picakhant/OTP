import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import noteRouter from "./routes/info.js";

dotenv.config();
const port = process.env.PORT;
const uri = process.env.dbURI;

//init app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//api routes
app.use("/api", userRouter);
app.use("/api/note", noteRouter);

//connect and listen
mongoose
  .connect(uri)
  .then(() => {
    console.log("connect to db");
    app.listen(port, () => {
      console.log(123);
    });
  })
  .catch((error) => console.log(error));

import express from "express";
import requireAuth from "../middleware/requireAuth.js";

const noteRouter = express.Router();

//auth middleware for all request and routers
noteRouter.use(requireAuth);

noteRouter.get("/", (req, res) => {
  res.send("Hello World");
});

export default noteRouter;

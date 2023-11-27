import jwt from "jsonwebtoken";
import { userModel } from "../Models/userModel.js";
const requireAuth = async (req, res, next) => {
  //verify user
  const {authorization} = req.headers;
  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token require" });
  }

  // Bearer asjkfljsadf.asjdfklja.ajfdlkj
  //we split the token by sapce
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Request is not authorized" });
  }
};

export default requireAuth;
  
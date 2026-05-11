import jwt from "jsonwebtoken";
import userModel from "../DB/models/user.model.js";

export const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  const [prefix, token] = authorization?.split(" ") || [];
  if (!prefix || !token) {
    return res.status(404).json({ message: "token is required" });
  }

  let signature = "";
  if (prefix == "Bearer") {
    signature = process.env.SIGNATURE_access_USER;
  } else {
    return res.status(400).json({ message: "invalid token" });
  }
  const decode = jwt.verify(token, signature);
  const user = await userModel.findById(decode.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  req.user = user;
  return next();
};

export const optionalAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(); 

  const [prefix, token] = authorization.split(" ") || [];
  if (!prefix || !token) return next();

  try {
    const decode = jwt.verify(token, process.env.SIGNATURE_access_USER);
    const user = await userModel.findById(decode.id);
    if (user) req.user = user;
  } catch { 
    
   }

  return next();
};
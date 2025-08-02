import jwt from "jsonwebtoken";
import User  from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

      const refreshToken = req.cookies?.refreshToken;
      
      if (!token) {
        return res.status(401).send("Unauthorized request");
      }
   

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);


    if (!user) {
      return res.status(401).send("Invalid Access Token");
    }
    
    if (user.refreshToken != refreshToken) {
      res.clearCookie('accessToken').clearCookie('refreshToken'); // Remove invalid token
      return res.status(401).send("Session expired Please Login again!");
    }
    const loggedInUser = await User.findById(user._id);
    req.user = loggedInUser;
    next();
  } catch (error) {
    return res.status(401).send(error?.message || "Invalid access token");
  }
};


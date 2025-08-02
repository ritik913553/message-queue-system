import { Router } from "express";
import passport  from "../middlewares/passport.middleware.js";
import { googleCallback, googleLoginFailed,getUser,logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router
    .route("/login-with-google")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));
router.route("/login-with-google/callback").get(
    passport.authenticate("google", {
        failureRedirect: "/api/v1/auth/login-with-google/failed",
    }),
    googleCallback
);

router.route("/login-with-google/failed").get(googleLoginFailed);

router.route("/logout").get(verifyJWT,logoutUser)

router.route("/me").get(verifyJWT , getUser);

export default router;

import User from "../models/user.model.js";
import { addMessageTOQueue } from "../queues/producer.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access tokens"
        );
    }
};

const loginWithGoogle = async (userData, cb) => {
    // TODO :find or create user in database also generate token and sent
    try {
        const userDataConverted = JSON.parse(JSON.stringify(userData));
        const data = userDataConverted._json;
        const { name, email, picture, sub } = data;
        const provider = userDataConverted.provider;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return cb(null, existingUser);
        } else {
            const newUser = await User.create({
                name: name,
                email,
                profileImage: picture,
            });

            // add a message in the queue for send the welcome email to the user
            addMessageTOQueue({
                email: newUser.email,
                name: newUser.name,
            });

            cb(null, newUser);
        }
    } catch (error) {
        console.error("Error in loginWithGoogle:", error);
        return cb(error);
    }
};

const googleCallback = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = req.user;

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: true,
        };
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        req.logout((err) => {
            if (err) {
                console.error("Error logging out the session:", err);
                return res
                    .status(500)
                    .json({ message: "Internal Server Error" });
            }
            res.cookie("accessToken", accessToken, options).cookie(
                "refreshToken",
                refreshToken,
                options
            );

            res.redirect("http://localhost:5173");
        });
    } catch (error) {
        console.error("Error in Google Callback:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const googleLoginFailed = (req, res) => {
    // TODO: handle login failed scenario
    res.status(400).json({ message: "user authentication failed" });
};

const getUser = async (req, res) => {
    return res.status(200).json(req.user);
};

const logoutUser = async (req, res) => {
    const user = req.user;
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        const loggedInUser = await User.findByIdAndUpdate(user._id, {
            refreshToken: null,
        });
        return res
            .status(200)
            .json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error in logout user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export {
    loginWithGoogle,
    googleCallback,
    googleLoginFailed,
    getUser,
    logoutUser,
};

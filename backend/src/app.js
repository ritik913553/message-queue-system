import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./middlewares/passport.middleware.js";
import session from "express-session";
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: "isdfhnoifjnoi3294832",
    resave: false,
    saveUninitialized: false,
  })
);
// app.use(passport.initialize());
// app.use(passport.session());




app.get("/", (req, res) => {
  res.send("Welcome to the Queue System API");
});


import userRouter from "./routers/user.routes.js";


app.use("/api/v1/auth", userRouter);


export { app };

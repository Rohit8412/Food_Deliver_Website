import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";

//Private route authorization config
import privateRouteConfig from "./config/route.config.js";
import googleAuthConfig from "./config/google.config.js";

//Database connection
import ConnectDB from "./database/connection.js";

import Auth from "./api/auth/index.js";
import Food from "./api/food/index.js";
import Restaurant from "./api/restaurant/index.js";
import User from "./api/user/index.js";
import Menu from "./api/menu/index.js";
import Order from "./api/order/index.js";
import Image from "./api/images/index.js";
import Review from "./api/review/index.js";

dotenv.config();

const zomato = express();

//adding additional passport configuration
privateRouteConfig(passport);
googleAuthConfig(passport);

zomato.use(cors());
zomato.use(helmet());
zomato.use(express.json());
zomato.use(
  session({ secret: "ZomatoApp", resave: false, saveUninitialized: true })
);
zomato.use(passport.initialize());
zomato.use(passport.session());

const PORT = 4000;

zomato.get("/", (req, res) => {
  res.json({
    Message: "Server is running",
  });
});

///auth/signup
zomato.use("/auth", Auth);
zomato.use("/food", Food);
zomato.use("/restaurant", Restaurant);
zomato.use("/review", Review);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/order", Order);
zomato.use("/image", Image);

zomato.listen(PORT, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running !!! and connected to db...");
    })
    .catch((error) => {
      console.log("Server is running but database connection failed...");
      console.log(error);
    });
});

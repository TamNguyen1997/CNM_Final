require("dotenv").config();
require("./lib/connDatabase");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express()
const http = require("http").Server(app)

require("./lib/passport"); // use passport strategy
const passport = require("passport");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());

const authRouter = require('./controller/auth');
const apiRouter = require('./controller/api');

app.get("/", (req, res) => res.json({"msg": "Welcome to Internet-Banking API."}));

app.use("/auth", authRouter);
// app.use("/api", passport.authenticate("jwt", {session: false}), apiRouter);
app.use("/api", apiRouter);

process.env.PORT = 3000;
http.listen(process.env.PORT,() => console.log(`Server listening on port: ${process.env.PORT}`));

// const User = require("./models/user")
// const init = async () => {
//     // await User.signUp("admin1", "123", "Admin Thanh", "0348882382");
//     // await User.signUp("user132", "123", "User Châu", "0728324321");

// }
// init();
const express = require("express");
const verifyJWT = require("./middlewares/verifyJWT");
var cors = require("cors");

require("dotenv").config();

const usersRouter = require("./routes/users");
const customerRouter = require("./routes/customers");
const paymentRouter = require("./routes/payments");
const reicevementRouter = require("./routes/receivements");
const authRouter = require("./routes/auth");
const meRouter = require("./routes/me");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

//app.use(verifyJWT); affecting routes above it for some unknown reason

app.use("/api/me", verifyJWT, meRouter);
app.use("/api/customers", verifyJWT, customerRouter);
app.use("/api/payments", verifyJWT, paymentRouter);
app.use("/api/receivements", verifyJWT, reicevementRouter);

app.listen(process.env.PORT || 3333, () => console.log("server started"));

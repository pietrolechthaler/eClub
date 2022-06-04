require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors=require("cors");

/* --- Middlewares: Body Parser --- */
app.use(bodyParser.json());

/* --- Middlewares: Cors --- */
app.use(cors());

/* --- Routes --- */
const authRoute = require('./routes/auth');
const userRoute = require('./routes/User');
const userTypeRoute = require('./routes/UserType');
const teamRoute = require('./routes/Team');
const passwordResetRoute = require('./routes/password_reset');
const paymentRoute = require ('./routes/Payment');
app.use("/api/v1/user", userRoute)
app.use("/api/v1/usertype", userTypeRoute)
app.use("/api/v1/team", teamRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/password_reset", passwordResetRoute)
app.use("/api/v2/payment", paymentRoute)

/* --- DB Connection --- */
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

/* --- Server Starting --- */
app.listen(3001, () => console.log("Server started"));



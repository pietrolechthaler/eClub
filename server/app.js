const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors=require("cors");
const path = require('path')


/* --- Middlewares: Body Parser --- */
app.use(bodyParser.json());

/* --- Middlewares: Cors --- */
app.use(cors());

/* --- Routes v1 --- */
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const userTypeRoute = require('./routes/usertype');
const teamRoute = require('./routes/team');
const passwordResetRoute = require('./routes/password_reset');

app.use("/api/v1/user", userRoute)
app.use("/api/v1/usertype", userTypeRoute)
app.use("/api/v1/team", teamRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/password_reset", passwordResetRoute)

/* --- Routes v2 --- */
const eventRoute = require('./routes/event');
const eventTypeRoute = require('./routes/eventtype');
const attendanceRoute = require('./routes/attendance');
const evaluationRoute = require('./routes/evaluation');
const summoningRoute = require('./routes/summoning');
const paymentRoute = require ('./routes/payment');
const medRoute = require('./routes/med');
const communicationRoute = require('./routes/communication');
const materialRoute = require('./routes/material');

app.use("/api/v2/event", eventRoute);
app.use("/api/v2/eventtype", eventTypeRoute);
app.use("/api/v2/attendance", attendanceRoute);
app.use("/api/v2/evaluation", evaluationRoute);
app.use("/api/v2/summoning", summoningRoute);
app.use("/api/v2/payment", paymentRoute)
app.use("/api/v2/med", medRoute)
app.use("/api/v2/communication", communicationRoute);
app.use("/api/v2/material", materialRoute)

app.use(express.static(path.join(__dirname, '../../client/build')))

app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../../client/build/index.html'))
 })

app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});


module.exports = app;

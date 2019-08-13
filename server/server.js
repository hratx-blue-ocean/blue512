require("dotenv").config();
const createError = require("http-errors");
const logger = require("morgan");
const express = require("express");
const app = express();
const query = require("../db/query.js");
const cronOperations = require("../db/cron.js");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());

/*
// here is an example of how to query the database

app.get('/someRoute', (req, res) => {
    query.getAllEvents()
    .then(data => {
        // server logic
        res.send(data);
    })
    .catch(console.log);
});

// or

xapp.get('/someOtherRoute', async(req, res) => {
    const events = await query.getAllEvents();
    // server logic
    res.send(events);
}
*/

//test route for testing OAuth configuration

// open up CORS
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger("dev"));
app.use("/", express.static(path.join(__dirname, "../client/public")));
// You can place your routes here, feel free to refactor:
const { api } = require("./routes");
app.use("/api/", api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

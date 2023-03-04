const createError = require ("http-errors");
const express = require("express");
const path = require("path");

var cors = require("cors");

const app = express();

const dotenv = require('dotenv');
const OpenAI = require('openai-api');

import HomeRouter from "./routes/home"


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static(path.join(__dirname, "public")));


dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


app.use("/", HomeRouter);

app.use(function (req, res, next) {
    next(createError(404));
  });
  
// error handler
app.use(function (err, req, res, next) {
// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

app.listen(3000, () => {
    console.log('Starting server at port 3000');
});
  
module.exports = app;
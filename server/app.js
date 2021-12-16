const path = require("path");
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const app = express();
module.exports = app;

// if (process.env.NODE_ENV !== "production") require("../secrets");

// console.log("logging out my environement variables: ", process.env);
// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

app.get("/exchange_token", async ({ query: { code } }, res) => {
  const ACCESS_TOKEN = "access_token";
  const body = {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code: code,
    grant_type: "authorization_code",
  };

  const header = {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.post(
    `https://www.strava.com/oauth/token`,
    body,
    header
  );

  console.log("this is myAuth", data);
  res.redirect(`http://localhost:8080/home?access_token=${data.access_token}`);
});

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

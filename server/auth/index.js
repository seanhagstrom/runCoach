const router = require("express").Router();
const axios = require("axios");
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", (req, res) => {
  // try {
  res.redirect(
    `http://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:8080/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`
  );
  // } catch (error) {
  //   console.error("something is wrong with signup", error);
  // }
});

router.get("/exchange_token", ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
  };
  axios.post(`https://www.strava.com/oauth/token`, body);
  console.log("this is my res", res);
});
// '/exchange_token/

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

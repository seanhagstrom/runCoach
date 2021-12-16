const router = require("express").Router();
const axios = require("axios");
const { activitiesLink } = require("../Utils/utilityFuncs");
// if (process.env.NODE_ENV !== "production") require("../secrets");
module.exports = router;

// Get api/athlete
router.get("/", async (req, res, next) => {
  try {
    res.send("Nothing here yet");
  } catch (err) {
    next(err);
  }
});

// GET api/athlete/activities
router.get("/activities", async (req, res, next) => {
  try {
    const token = req.headers.referer.slice(40);
    const { data } = await axios.get(activitiesLink, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

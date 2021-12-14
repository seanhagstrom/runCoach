const router = require("express").Router();
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
    res.send("Activities will be here");
  } catch (error) {
    console.error(error);
  }
});

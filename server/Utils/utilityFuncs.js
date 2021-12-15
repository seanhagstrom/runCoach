const axios = require("axios");

if (process.env.NODE_ENV !== "production") require("../../secrets");

// console.log("logging out my environement variables: ", process.env);

const authLink = "https://www.strava.com/oauth/token";

// const activitiesLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${process.env.STRAVA_ACCESS_TOKEN}`;
const activitiesLink = `https://www.strava.com/api/v3/athlete/activities`;

// const reAuthorize = async () => {
//   try {
//     const data = await axios.post(authLink, {
//       body: JSON.stringify({
//         client_id: process.env.STRAVA_CLIENT_ID,
//         client_secret: process.env.STRAVA_CLIENT_SECRET,
//         refresh_token: process.env.STRAVA_REFRESH_TOKEN,
//         grant_type: "refresh_token",
//       }),
//     });
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// console.log(reAuthorize());

module.exports = {
  activitiesLink,
};

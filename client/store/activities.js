import axios from "axios";

const SET_ACTIVITIES = "SET_ACTIVITIES";

const _setActivities = (activities) => ({
  type: SET_ACTIVITIES,
  activities,
});

export const getActivities = () => async (dispatch) => {
  try {
    const data = await axios.get("/api/athlete/activities");
    console.log(data);
    dispatch(_setActivities(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      console.log("activities reducer ", action.activities);
      return [...state, action.activities];
    default:
      return state;
  }
};

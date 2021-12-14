import axios from "axios";

const SET_ACTIVITIES = "SET_ACTIVITIES";

const _setActivities = (activities) => ({
  type: SET_ACTIVITIES,
  activities,
});

export const getActivities = () => async (dispatch) => {
  try {
    const { data: activities } = await axios.get("/api/athlete/activities");
    dispatch(_setActivities(activities));
  } catch (error) {
    console.error(error);
  }
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return [...action.activities];
    default:
      return state;
  }
};

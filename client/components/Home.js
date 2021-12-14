import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import activities, { getActivities } from "../store/activities";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const [activities, setActivities] = useState(props);
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <button onClick={() => props.fetchActivities()}>Get Activities</button>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    activities: state.activities,
  };
};

const mapDispatch = (dispatch) => ({
  fetchActivities: () => dispatch(getActivities()),
});

export default connect(mapState, mapDispatch)(Home);

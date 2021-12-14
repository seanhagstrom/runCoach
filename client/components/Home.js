import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getActivities } from "../store/activities";
import { Activities } from "./Activities";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const [activities, setActivities] = useState(props);
  const { username } = props;

  useEffect(() => {
    setActivities(props.activities);
  }, [props.activities]);

  console.log("home activities: ", activities);
  return (
    <div>
      <h3>Welcome, {username}</h3>
      <button onClick={() => props.fetchActivities()}>Get Activities</button>
      <Activities />
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

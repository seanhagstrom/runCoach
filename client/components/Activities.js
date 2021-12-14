import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getActivities } from "../store/activities";

export const Activities = (props) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    props.fetchActivities();
  }, []);

  useEffect(() => {
    setActivities(props.activities);
  }, [props.activities]);

  return (
    <div>
      <h3>Activities will be here</h3>
      {props.activities.map((activity) => {
        return <p key={activity.id}>{activity.name}</p>;
      })}
    </div>
  );
};

const mapState = (state) => ({
  // username: state.auth.username,
  activities: state.activities,
});

const mapDispatch = (dispatch) => ({
  fetchActivities: () => dispatch(getActivities()),
});

export default connect(mapState, mapDispatch)(Activities);

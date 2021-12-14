import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getActivities } from "../store/activities";
import Activity from "./Activity";

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
      <table>
        <tbody>
          <tr>
            <th>Activity Title</th>
            <th>Distance</th>
          </tr>
          {props.activities.map((activity) => {
            return <Activity key={activity.id} activity={activity} />;
          })}
        </tbody>
      </table>
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

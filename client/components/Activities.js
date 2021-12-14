import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getActivities } from "../store/activities";

export const Activities = () => {
  // const [activities, setActivities] = useState([]);
  return (
    <div>
      <h3>Activities will be here</h3>
    </div>
  );
};

export default connect(Activities);

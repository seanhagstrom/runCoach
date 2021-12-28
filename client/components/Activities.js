import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getActivities } from "../store/activities";
import Activity from "./Activity";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import polyUtil from "polyline-encoded";

export const Activities = (props) => {
  const [activities, setActivities] = useState([]);

  const stravaToken = props.stravaToken;
  useEffect(() => {
    if (stravaToken) {
      props.fetchActivities();
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    setActivities(props.activities);
  }, [props.activities]);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPos);
  }

  function showPos({ coords }) {
    return coords;
  }

  const multiPolyline = props.activities
    .filter((activity) => activity.map.summary_polyline !== null)
    .map((activity) => {
      return polyUtil.decode(activity.map.summary_polyline);
    });

  console.log(multiPolyline);

  const limeOptions = { color: "lime" };
  const redOptions = { color: "red" };
  const purpleOptions = { color: "purple" };

  getLocation();
  return (
    <div>
      <h3>Sign in to see your activities!</h3>
      <MapContainer
        center={[35.94, -84.0722167]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Polyline pathOptions={purpleOptions} positions={multiPolyline} />
        {/* <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
      </MapContainer>
      <br></br>
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
  activities: state.activities,
});

const mapDispatch = (dispatch) => ({
  fetchActivities: () => dispatch(getActivities()),
});

export default connect(mapState, mapDispatch)(Activities);

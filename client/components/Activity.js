import React from "react";

export default function Activity(props) {
  const activity = props.activity;

  return (
    <tr>
      <td>{activity.name}</td>
      <td>{(activity.distance / 1609).toFixed(2)} miles</td>
    </tr>
  );
}

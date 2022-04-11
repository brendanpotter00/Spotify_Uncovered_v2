import React from "react";
import "./dashboard.css";

function Dashboard({ user }) {
  const test = "hello";
  console.log("USER IN DASH", user);
  return <div>I am the dashboard and the user is logged in</div>;
}

export default Dashboard;

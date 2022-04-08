import React from "react";
import { loginUrl } from "./spotify";

function Login() {
  return (
    <div className="login">
      I am the login button
      <a href={loginUrl}>Login</a>
    </div>
  );
}

export default Login;

import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
export default function SignIn(props) {
  return (
    <>
      <div className="SignIn">
        <div className="container">
          <p id="title">Sign in</p>
          <p id="description">Sign in as {props.name}</p>

          <input className ="input" type="text" id="username" placeholder="Username" />
          <input className ="input" type="password" id="password" placeholder="Password" />
        <div className="signuplink">
          <Link className="link" to="/signup">No Account! Signup</Link>
        </div>
          <button className="button">
            <span class="username">Login</span>
          </button>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";
import cookies from "js-cookie";

export default function SignIn(props) {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      let response;
      if (props.name === "user") {
        response = await axios.post("http://127.0.0.1:8000/loginuser", {
          cnic: credential,
          password,
        });

        if (response && response.data && response.data.usertoken) {
          // Delete existing author token if it exists
          if (cookies.get("authortoken")) {
            cookies.remove("authortoken");
          }
          // Save user token in cookies
          const { usertoken } = response.data;
          cookies.set("usertoken", usertoken, { path: "/" });
          navigate("/userdashboard");
        }
      } else if (props.name === "author") {
        response = await axios.post("http://127.0.0.1:8000/loginauthor", {
          official_id: credential,
          password,
        }); 
        if (response && response.data && response.data.authortoken) {
          // Delete existing user token if it exists
          if (cookies.get("usertoken")) {
            cookies.remove("usertoken");
          }
          // Save author token in cookies
          const { authortoken } = response.data;
          cookies.set("authortoken", authortoken, { path: "/" });
          navigate("/authordashboard");
        }
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  };

  return (
    <div className="SignIn">
      <div className="container">
        <p id="title">Sign in</p>
        <input
          className="input"
          type="text"
          id="username"
          placeholder={props.name === "user" ? "Cnic" : "Official ID"}
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="signuplink">
          {props.name === "author" ? (
            <Link className="link" to="/signupauthor">
              No Account! Signup
            </Link>
          ) : (
            <Link className="link" to="/signupuser">
              No Account! Signup
            </Link>
          )}
        </div>
        <button className="button" onClick={handleSignIn}>
          Login
        </button>
      </div>
    </div>
  );
}

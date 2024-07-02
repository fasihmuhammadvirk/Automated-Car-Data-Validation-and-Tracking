import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";
import cookies from "js-cookie";

export default function SignIn(props) {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      let response;
      if (props.name === "user") {
        response = await axios.post("http://127.0.0.1:8000/user/login", {
          cnic: credential,
          password,
        });

        if (response && response.data && response.data.usertoken) {
          // Delete existing analyst token if it exists
          if (cookies.get("analysttoken")) {
            cookies.remove("analysttoken");
          }
          // Save user token in cookies
          const { usertoken } = response.data;
          cookies.set("usertoken", usertoken, { path: "/" });
          window.location.href = "/userdashboard";
        }
      } else if (props.name === "analyst") {
        response = await axios.post("http://127.0.0.1:8000/analyst/login", {
          official_id: credential,
          password,
        }); 
        if (response && response.data && response.data.analysttoken) {
          // Delete existing user token if it exists
          if (cookies.get("usertoken")) {
            cookies.remove("usertoken");
          }
          // Save analyst token in cookies
          const { analysttoken } = response.data;
          cookies.set("analysttoken", analysttoken, { path: "/" });
          window.location.href = "/analystdashboard";
        }
      }
      else {
        response = await axios.post("http://127.0.0.1:8000/admin/login", {
          id: credential,
          password,
        })

        if (response && response.data && response.data.admintoken) {
          // Delete existing user token if it exists
          if (cookies.get("usertoken")) {
            cookies.remove("usertoken");
          }
          if (cookies.get("analysttoken")) {
            cookies.remove("analysttoken");
          }
          const { admintoken } = response.data;
          cookies.set("admintoken", admintoken, { path: "/" });
          window.location.href = "/admindashboard";
        }


      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  };

  return (
    <div className="SignIn">
      <div className="container">
        <p id="title">Login</p>
        <input
          className="input"
          type="text"
          id="username"
          placeholder={props.name === "user" ? "Cnic" : props.name === "analyst" ? "Official ID" : "ID"}
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
         { props.name === "user" ? (
            <Link className="link" to="/signupuser">
              No Account! Signup
            </Link>
          ) : (
            <></> 
          )}
        </div>
        <button className="button" onClick={handleSignIn}>
          Login
        </button>
      </div>
    </div>
  );
}

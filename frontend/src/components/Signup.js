import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";

export default function Signup(props) {
  const [officialId, setOfficialId] = useState("");
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [number_plate, setCarNumberPlate] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      let response;
      if (props.name === "user") {
        response = await axios.post("http://127.0.0.1:8000/user/signup", {
          name,
          cnic,
          password,
          number_plate,
        });
        if (response && response.data && response.data.usertoken) {
          if (cookies.get("authortoken")) {
            cookies.remove("authortoken");
          }
          
          const { usertoken } = response.data;
          // Save user token in cookies
          cookies.set("usertoken", usertoken, { path: "/" });
          // Redirect to user dashboard upon successful signup
          navigate("/userdashboard");
        }
      } else if (props.name === "author") {
        response = await axios.post("http://127.0.0.1:8000/author/signup", {
          officialId,
          password,
        });
        if (response && response.data && response.data.authortoken) {

          if (cookies.get("usertoken")) {
            cookies.remove("usertoken");
          }
          const { authortoken } = response.data;
          // Save author token in cookies
          cookies.set("authortoken", authortoken, { path: "/" });
          // Redirect to author page upon successful signup
          navigate("/authorpage");
        }
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
    }
  };

  return (
    <>
      <div className="Signup">
        <div className="container">
          <p id="title">Sign up</p>
          <p id="description">Sign up as {props.name}</p>
          {props.name === "user" ? (
            <>
              <input
                className="input"
                type="text"
                id="username"
                placeholder="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input"
                type="text"
                id="username"
                placeholder="Cnic"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
              />
              <input
                className="input"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="input"
                type="text"
                id="carnumberplate"
                placeholder="Car Reg No"
                value={number_plate}
                onChange={(e) => setCarNumberPlate(e.target.value)}
              />
            </>
          ) : props.name === "author" ? (
            <>
              <input
                className="input"
                type="text"
                id="officialid"
                placeholder="Official ID"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
              />
              <input
                className="input"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          ) : null}
          <div className="signuplink">
            <Link className="link" to="/signinuser">
              Already have an Account?
            </Link>
          </div>
          <button className="button" onClick={handleSignup}>
            Signup
          </button>
        </div>
      </div>
    </>
  );
}

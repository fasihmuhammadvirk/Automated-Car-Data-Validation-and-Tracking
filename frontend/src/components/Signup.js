import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";

export default function Signup(props) {
  const [officialId, setOfficialId] = useState("");
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [number_plate, setCarNumberPlate] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");



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
          if (cookies.get("analysttoken")) {
            cookies.remove("analysttoken");
          }
          
          const { usertoken } = response.data;
          // Save user token in cookies
          cookies.set("usertoken", usertoken, { path: "/" });
          // Redirect to user dashboard upon successful signup
          window.location.href = "/userdashboard";
        }
      } else if (props.name === "analyst") {
        response = await axios.post("http://127.0.0.1:8000/analyst/signup", {
          officialId,
          name,
          location,
          contact,
          password,
        });
        if (response && response.data && response.data.analysttoken) {

          if (cookies.get("usertoken")) {
            cookies.remove("usertoken");
          }
          const { analysttoken } = response.data;
          // Save analyst token in cookies
          cookies.set("analysttoken", analysttoken, { path: "/" });
          // Redirect to analyst page upon successful signup
          window.location.href = "/analystpage";
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
          ) : props.name === "analyst" ? (
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
                type="text"
                id="username"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                className="input"
                type="text"
                id="contact"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </>
          ) : null}
          <div className="signuplink">
            <Link className="link" to="/loginuser">
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

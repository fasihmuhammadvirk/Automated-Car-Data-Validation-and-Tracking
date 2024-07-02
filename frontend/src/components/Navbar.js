import React from "react";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import "./Navbar.css";
import Logo from "../assets/Logo.png";

export default function Navbar(props) {
  const handleSignout = () => {
    if (props.name === "User") {
      cookies.remove("usertoken");
      window.location.href = "/";
    } else if (props.name === "Analyst") {
      cookies.remove("analysttoken");
      window.location.href = "/";
    } else {
      cookies.remove("admintoken");
      window.location.href = "/";
    }
  };

  return (
    <>
      <div className="navbar">
        <Link className="navbar-logo" to={`/${props.name}dashboard`}>
          <img src={Logo} alt="Logo" />
          <span>{props.name} Dashboard</span>
        </Link>
        <div className="navbar-links">
          {props.name === "User" ? (
            <>
              <Link id="link" to={"/report"}>
                Report
              </Link>
              <Link id="link" to={"/usernotification"}>
                Notification
              </Link>
            </>
          ) : props.name === "Admin" ? (
            <>
              <Link id="link" to={"/userlist"}>
                User List
              </Link>
            </>
          ) : null}
        </div>
        <div className="singout">
          <button id="signout" onClick={handleSignout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

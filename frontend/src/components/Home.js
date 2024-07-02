import React from "react";
import "./Home.css";
import UserLogo from "../assets/User.png";
import Circle from "../assets/Ellipse.png";
import Analyst from "../assets/Analyst.png";
import Admin from "../assets/Admin.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="Home">
        <div className="container">
          <p id ="title" >Welcome!</p>
          <p id="description">Please choose your login option below:</p>
          <Link className="button" to={"/loginuser"}>
            <div className="left">
            <img
              src={UserLogo}
              alt="User Logo"
              className="logo"
              />
            <span class="username">User</span>
            </div>
            <img
              src={Circle}
              alt="Circle Logo"
              className="circle-image"
            />
          </Link>

          <Link className="button" to={"/loginanalyst"}>
            <div className="left">
            <img
              src={Analyst}
              alt="User Logo"
              className="logo"
              />
            <span class="username">Analyst</span>
            </div>
            <img
              src={Circle}
              alt="Circle Logo"
              className="circle-image"
            />
          </Link>

          <Link className="button" to={"/loginadmin"}>
            <div className="left">
            <img
              src={Admin}
              alt="User Logo"
              className="logo"
              />
            <span class="username">Administrator</span>
            </div>
            <img
              src={Circle}
              alt="Circle Logo"
              className="circle-image"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

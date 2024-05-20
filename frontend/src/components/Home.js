import React from "react";
import "./Home.css";
import UserLogo from "../assets/User.png";
import Circle from "../assets/Ellipse.png";
import Author from "../assets/Author.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="Home">
        <div className="container">
          <p id ="title" >Sign in</p>
          <p id ="description" >Select to Sign up as a User or Author!</p>
          <Link className="button" to={"/signinuser"}>
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

          <Link className="button" to={"/signinauthor"}>
            <div className="left">
            <img
              src={Author}
              alt="User Logo"
              className="logo"
              />
            <span class="username">Author</span>
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

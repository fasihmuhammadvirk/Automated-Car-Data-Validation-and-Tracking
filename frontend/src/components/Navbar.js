import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cookies from "js-cookie";
import './Navbar.css';
import Logo from '../assets/Logo.png';

export default function Navbar(props) {
  const navigate = useNavigate();

  const handleSignout = () => {
    if (props.name === "User") {
      cookies.remove("usertoken");
      navigate("/");
    } else if (props.name === "Author") {
      cookies.remove("authortoken");
      navigate("/");
    }
  };

  return (
    <>
    <div className='navbar'>
      <Link className='navbar-logo' to={`/${props.name}dashboard`}>
        <img src={Logo} alt="Logo" />
        <span>{props.name} Dashboard</span>
      </Link>
      <div className="navbar-links">
        {props.name === "User" ? (
          <>
            <Link id="link" to={"/report"}>Report</Link>
            <Link id="link" to={"/usernotification"}>Notification</Link>
          </>
        ) : (
          <>
          <Link id="link" to={"/notification"}>Notification</Link>
          </>
        )}
      </div>
      <div className="singout">
        <button id="signout" onClick={handleSignout}>Sign Out</button>
      </div>
    </div>
      </>
  );
}

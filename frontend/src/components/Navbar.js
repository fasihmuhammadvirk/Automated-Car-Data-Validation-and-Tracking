import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/Logo.png';

export default function Navbar(props) {
  return (
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
          <Link id="link" to={"/notification"}>Notification</Link>
        )}
      </div>
    </div>
  );
}

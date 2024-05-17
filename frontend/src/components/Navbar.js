import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../asserts/Logo.png';

export default function Navbar(props) {
  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <img src={Logo} alt="Logo" />
        <span>{props.name} Dashboard</span>
      </div>
      <div className="navbar-links">
        {props.name === "User" ? (
          <>
            <Link id="link" to="/report">Report</Link>
            <Link id="link" to="/notification">Notification</Link>
          </>
        ) : (
          <Link id="link" to="/notification">Notification</Link>
        )}
      </div>
    </div>
  );
}

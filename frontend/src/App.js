import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import SignIn from "./components/SignIn.js";
import UserDashboard from "./components/UserDashboard.js";
import AuthorDashboard from "./components/AuthorDashboard.js";
import Report from "./components/Report.js";
import Notification from "./components/Notification.js";
import Signup from "./components/Signup.js";
import Footer from "./components/Footer.js";
import cookies from "js-cookie";
import "./App.css";

function App() {
  const usertoken = cookies.get("usertoken");
  const authortoken = cookies.get("authortoken");

  // Render routes based on the presence of the usertoken cookie
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signinauthor" element={<SignIn name="author" />} />
        <Route exact path="/signinuser" element={<SignIn name="user" />} />
        <Route exact path="/signupuser" element={<Signup name="user" />} />
        <Route exact path="/signupauthor" element={<Signup name="author" />} />
        {/* Render UserDashboard, Notification, and Report routes only if usertoken exists */}
        {usertoken && (
          <>
            <Route exact path="/userdashboard" element={<UserDashboard />} />
            <Route
              exact
              path="/usernotification"
              element={<Notification name="User" />}
            />
            <Route exact path="/report" element={<Report />} />
          </>
        )}

        {authortoken && (
        <>
        <Route exact path="/authordashboard" element={< AuthorDashboard />} />
        </>)}
      </Routes>
      <Footer />
    </>
  );
}

export default App;

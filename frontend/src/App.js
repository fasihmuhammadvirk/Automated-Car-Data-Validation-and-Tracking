import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import SignIn from "./components/SignIn.js";
import UserDashboard from "./components/UserDashboard.js";
import AnalystDashboard from "./components/AnalystDashboard.js";
import Report from "./components/Report.js";
import Notification from "./components/Notification.js";
import Signup from "./components/Signup.js";
import AdminDashboard from "./components/AdminDashboard.js";
import UserList from "./components/UserList.js";
import Footer from "./components/Footer.js";
import cookies from "js-cookie";
import "./App.css";

function App() {
  const usertoken = cookies.get("usertoken");
  const analysttoken = cookies.get("analysttoken");
  const admintoken = cookies.get("admintoken");

  // Render routes based on the presence of the usertoken cookie
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/loginanalyst" element={<SignIn name="analyst" />} />
        <Route exact path="/loginuser" element={<SignIn name="user" />} />
        <Route exact path="/signupuser" element={<Signup name="user" />} />
        <Route exact path = "/loginadmin" element={<SignIn name="admin" />} />
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

        {analysttoken && (
        <>
        <Route exact path="/analystdashboard" element={< AnalystDashboard />} />
        <Route exact path="/analystnotification" element={<Notification name="Analyst" />} />
        </>)}

        {/* Render 404 page if neither usertoken nor analysttoken exist */}
        { admintoken && 
        
        (
          <>
          <Route path = "/admindashboard" element={<AdminDashboard />} />
          <Route path = "/userlist" element={<UserList />} />
          </>

        )
        }

      </Routes>
      <Footer />
    </>
  );
}

export default App;





import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notification.css";
import Navbar from "./Navbar.js";
const cookies = require("js-cookie");

export default function Notification(props) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {

        let response;
        if (props.name === "Analyst") {
          const analysttoken = cookies.get("analysttoken");
          response = await axios.post(
            "http://127.0.0.1:8000/analyst/get_notifications/",
            {
              token: analysttoken,
            }
          );
        } else {
          const usertoken = cookies.get("usertoken");
          response = await axios.post(
            "http://127.0.0.1:8000/user/notifications/",
            {
              token: usertoken,
            }
          );
        }

        setNotifications(response.data.notifications);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [props.name]);

  if (loading) {
    return (
      <>
        <Navbar name={props.name} />
        <div className="notifications">
          <div className="container">
            <h2>Loading...</h2>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar name={props.name} />
        <div className="notifications">
          <div className="container">
            <h2>Error: {error.message}</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar name={props.name} />
      <div className="notifications">
        <div className="container">
          <h2>Notifications</h2>
          <div className="table">
            <table>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index}>
                    <td className="message">{notification}</td>
                    <td className="status">
                      <span className="dot"></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

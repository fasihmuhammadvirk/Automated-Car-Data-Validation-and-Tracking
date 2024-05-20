import React from "react";
import "./Notification.css";
import Navbar from "./Navbar.js";

const notifications = [
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
  {
    author: "Author 1",
    message:
      "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
  },
];
export default function Notification(props) {
  return (
    <>
    <Navbar name={`${props.name}`}/>
      <div className="notifications">
        <div className="container">
          <h2>Notifications</h2>
          <div className="table">
            <table>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index}>
                    <td className="author">{notification.author}</td>
                    <td className="message">{notification.message}</td>
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

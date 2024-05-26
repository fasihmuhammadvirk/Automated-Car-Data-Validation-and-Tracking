// import React from "react";
// import "./Notification.css";
// import Navbar from "./Navbar.js";

// const notifications = [
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },  {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },  {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
//   {
//     author: "Author 1",
//     message:
//       "This is a message by Hamza Farooq, You b****! Just kidding, have fun and enjoy the life with Ahmed ....",
//   },
// ];
// export default function Notification(props) {
//   return (
//     <>
//     <Navbar name={`${props.name}`}/>
//       <div className="notifications">
//         <div className="container">
//           <h2>Notifications</h2>
//           <div className="table">
//             <table>
//               <tbody>
//                 {notifications.map((notification, index) => (
//                   <tr key={index}>
//                     <td className="author">{notification.author}</td>
//                     <td className="message">{notification.message}</td>
//                     <td className="status">
//                       <span className="dot"></span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

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
        const usertoken = cookies.get("usertoken");
        const response = await axios.post(
          "http://127.0.0.1:8000/user/notifications/",
          {
            token: usertoken,
          }
        );
        setNotifications(response.data.notifications);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [props.userId]);

  if (loading) {
    return (
      <>
      <Navbar name={`${props.name}`} />;
      <div class="notifications">
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
      <Navbar name={`${props.name}`} />;
      <div class="notifications">
        <div className="container">
          <h2>Error: {error.message}</h2>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <Navbar name={`${props.name}`} />
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

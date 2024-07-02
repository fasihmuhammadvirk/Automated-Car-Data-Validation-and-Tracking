import React, { useRef, useState, useEffect } from "react";
import "./AnalystDashboard.css";
import Navbar from "./Navbar.js";
import logo from "../assets/logos.png";
import axios from "axios";

export default function AnalystDashboard() {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [carData, setCarData] = useState(null);
  const pollingIntervalRef = useRef(null);

  const startStreaming = () => {
    const videoElement = videoRef.current;
    videoElement.src = "http://localhost:8000/analyst/video_feed";

    setStreaming(true);
    startPolling();
  };

  const stopStreaming = () => {
    axios
      .get("http://localhost:8000/analyst/stop_feed")
      .then((response) => {
        window.location.reload();
        const videoElement = videoRef.current;
        videoElement.src = logo;
        setStreaming(false);
        stopPolling();
       

      })
      .catch((error) => {
        console.error("Error stopping video stream:", error);
      });
  };

  const fetchCarData = () => {
    axios
      .get("http://localhost:8000/analyst/get_car_data")
      .then((response) => {
        if (response.data && JSON.stringify(response.data) !== JSON.stringify(carData)) {
          setCarData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  };

  const startPolling = () => {
    pollingIntervalRef.current = setInterval(fetchCarData, 7000); // Fetch data every 5 seconds
  };

  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      stopPolling();
    };
  }, []);

  const clearCarData = () => {
    setCarData(null);
  };

//   return (
//     <>
//       <Navbar name={"analyst"} />
//       <div className="dashboard">
//         <div className="camera-feed">
//           <div className="camera-container">
//             <img ref={videoRef} src={logo} alt="Camera Feed" />
//           </div>
//           <div className="button-container">
//             <button onClick={startStreaming} disabled={streaming}>
//               Start Video
//             </button>
//             <button onClick={stopStreaming} disabled={!streaming}>
//               Stop Video
//             </button>
//             <button onClick={clearCarData} disabled={carData === null}>
//               Clear Data
//             </button>
//           </div>
//           <div className="status" style={{ background: carData ? (carData.is_stolen || !carData.owner_tax_paid ? "red" : "green") : "orange" }}>
//           <span>
//               {carData ? 
//                 (carData.is_stolen ? "Stolen" : "Not Stolen") + " / " + (carData.owner_tax_paid ? "Paid" : "Not Paid") 
//                 : "Retrieving Data"}
//             </span>
//           </div>
//         </div>
//         <div className="user-information-section">
//           <div className="table">
//             {!carData ? (
//               <p>Loading data...</p>
//             ) : carData ? (
//               <table>
//                 <tbody>
//                   <tr>
//                     <td className="analyst">Owner Name</td>
//                     <td className="message">{carData.owner_name}</td>
//                   </tr>
//                   <tr>
//                     <td className="analyst">Owner Cnic</td>
//                     <td className="message">{carData.owner_cnic}</td>
//                   </tr>
//                   <tr>
//                     <td className="analyst">Car Number Plate</td>
//                     <td className="message">{carData.number_plate}</td>
//                   </tr>
//                   <tr>
//                     <td className="analyst">Stolen Status</td>
//                     <td className="message" style={{ color: carData.is_stolen ? "red" : "green" }}>
//                       {carData.is_stolen ? "Stolen" : "Not Stolen"}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="analyst">Tax Status</td>
//                     <td className="message" style={{ color: carData.owner_tax_paid ? "green" : "red" }}>
//                       {carData.owner_tax_paid ? "Paid" : "Not Paid"}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             ) : (
//               <p>No car data available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// import React, { useRef, useState, useEffect } from "react";
// import "./analystDashboard.css";
// import Navbar from "./Navbar.js";
// import logo from "../assets/logos.png";
// import axios from "axios";

// export default function analystDashboard() {
//   const videoRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);
//   const [carData, setCarData] = useState(null);
//   const pollingIntervalRef = useRef(null);

//   const startStreaming = () => {
//     const videoElement = videoRef.current;
//     videoElement.src = "http://localhost:8000/analyst/video_feed";

//     setStreaming(true);
//     startPolling();
//   };

//   const stopStreaming = () => {
//     axios
//       .get("http://localhost:8000/analyst/stop_feed")
//       .then((response) => {
//         const videoElement = videoRef.current;
//         videoElement.src = logo;
//         setStreaming(false);
//         stopPolling();
//       })
//       .catch((error) => {
//         console.error("Error stopping video stream:", error);
//       });
//   };

//   const fetchCarData = () => {
//     axios
//       .get("http://localhost:8000/analyst/get_car_data")
//       .then((response) => {
//         if (response.data && JSON.stringify(response.data) !== JSON.stringify(carData)) {
//           setCarData(response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching car data:", error);
//       });
//   };

//   const startPolling = () => {
//     pollingIntervalRef.current = setInterval(fetchCarData, 7000); // Fetch data every 7 seconds
//   };

//   const stopPolling = () => {
//     if (pollingIntervalRef.current) {
//       clearInterval(pollingIntervalRef.current);
//       pollingIntervalRef.current = null;
//     }
//   };

//   useEffect(() => {
//     return () => {
//       // Cleanup on component unmount
//       stopPolling();
//     };
//   }, []);

//   const clearCarData = () => {
//     setCarData(null);
//   };

//   return (
//     <>
//       <Navbar name={"analyst"} />
//       <div className="dashboard">
//         <div className="camera-feed">
//           <div className="camera-container">
//             <img ref={videoRef} src={logo} alt="Camera Feed" />
//           </div>
//           <div className="button-container">
//             <button onClick={startStreaming} disabled={streaming}>
//               Start Video
//             </button>
//             <button onClick={stopStreaming} disabled={!streaming}>
//               Stop Video
//             </button>
//             <button onClick={clearCarData} disabled={carData === null}>
//               Clear Data
//             </button>
//           </div>
//           <div className="status" style={{ background: streaming ? (carData ? (carData.is_stolen || !carData.owner_tax_paid ? "red" : "green") : "orange") : "yellow", color: streaming ? "black" : "black" }}>
//             <span>
//               {streaming
//                 ? carData
//                   ? (carData.is_stolen ? "Stolen" : "Not Stolen") + " / " + (carData.owner_tax_paid ? "Paid" : "Not Paid")
//                   : "Retrieving Data"
//                 : "Start Streaming"}
//             </span>
//           </div>
//         </div>
//         <div className="user-information-section">
//           <div className="table">
//             {!streaming ? (
//               <p>Start Streaming</p>
//             ) : carData ? (
//               carData.message ? (
//                 <div>
//                   <p>{carData.message}</p>
//                   <p>Number Plate: {carData.number_plate}</p>
//                 </div>
//               ) : (
//                 <table>
//                   <tbody>
//                     <tr>
//                       <td className="analyst">Owner Name</td>
//                       <td className="message">{carData.owner_name}</td>
//                     </tr>
//                     <tr>
//                       <td className="analyst">Owner Cnic</td>
//                       <td className="message">{carData.owner_cnic}</td>
//                     </tr>
//                     <tr>
//                       <td className="analyst">Car Number Plate</td>
//                       <td className="message">{carData.number_plate}</td>
//                     </tr>
//                     <tr>
//                       <td className="analyst">Stolen Status</td>
//                       <td className="message" style={{ color: carData.is_stolen ? "red" : "green" }}>
//                         {carData.is_stolen ? "Stolen" : "Not Stolen"}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="analyst">Tax Status</td>
//                       <td className="message" style={{ color: carData.owner_tax_paid ? "green" : "red" }}>
//                         {carData.owner_tax_paid ? "Paid" : "Not Paid"}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               )
//             ) : (
//               <p>Loading data...</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

const getStatusStyle = () => {
  if (!streaming) {
    return { background: "yellow", color: "black" };
  } else if (carData) {
    if (carData.message && carData.message === "No Car Detail to Fetch") {
      return { background: "blue", color: "white" };
    } else if (carData.is_stolen || !carData.owner_tax_paid) {
      return { background: "red", color: "white" };
    } else {
      return { background: "green", color: "white" };
    }
  } else {
    return { background: "orange", color: '#514848' };
  }
};

const getStatusText = () => {
  if (!streaming) {
    return "Start Streaming";
  } else if (carData) {
    if (carData.message && carData.message === "No Car Detail to Fetch") {
      return "Car Not Registered";
    } else {
      return (carData.is_stolen ? "Stolen" : "Not Stolen") + " / " + (carData.owner_tax_paid ? "Paid" : "Not Paid");
    }
  } else {
    return "Retrieving Data";
  }
};

return (
  <>
    <Navbar name={"Analyst"} />
    <div className="dashboard">
      <div className="camera-feed">
        <div className="camera-container">
          <img ref={videoRef} src={logo} alt="Camera Feed" />
        </div>
        <div className="button-container">
          <button onClick={startStreaming} disabled={streaming}>
            Start Video
          </button>
          <button onClick={stopStreaming} disabled={!streaming}>
            Stop Video
          </button>
          <button onClick={clearCarData} disabled={carData === null}>
            Clear Data
          </button>
        </div>
        <div className="status" style={getStatusStyle()}>
          <span>{getStatusText()}</span>
        </div>
      </div>
      <div className="user-information-section">
        <div className="table">
          {!streaming ? (
            <p>Start Streaming</p>
          ) : carData ? (
            carData.message ? (
              <div>
                <p>{carData.message}</p>
                <p>Number Plate: {carData.number_plate}</p>
              </div>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <td className="analyst">Owner Name</td>
                    <td className="message">{carData.owner_name}</td>
                  </tr>
                  <tr>
                    <td className="analyst">Owner Cnic</td>
                    <td className="message">{carData.owner_cnic}</td>
                  </tr>
                  <tr>
                    <td className="analyst">Car Number Plate</td>
                    <td className="message">{carData.number_plate}</td>
                  </tr>
                  <tr>
                    <td className="analyst">Stolen Status</td>
                    <td className="message" style={{ color: carData.is_stolen ? "red" : "green" }}>
                      {carData.is_stolen ? "Stolen" : "Not Stolen"}
                    </td>
                  </tr>
                  <tr>
                    <td className="analyst">Tax Status</td>
                    <td className="message" style={{ color: carData.owner_tax_paid ? "green" : "red" }}>
                      {carData.owner_tax_paid ? "Paid" : "Not Paid"}
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    </div>
  </>
);
}
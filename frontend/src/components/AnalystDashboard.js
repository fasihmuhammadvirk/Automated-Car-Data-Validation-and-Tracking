import React, { useRef, useState, useEffect } from "react";
import "./AnalystDashboard.css";
import Navbar from "./Navbar.js";
import logo from "../assets/logos.png";
import axios from "axios";
import cookies from "js-cookie";

export default function AnalystDashboard() {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [carData, setCarData] = useState(null);
  const [showRetrieveButton, setShowRetrieveButton] = useState(false);
  const pollingIntervalRef = useRef(null);

  const startStreaming = () => {
    const videoElement = videoRef.current;
    videoElement.src = "http://localhost:8000/analyst/video_feed";
    setStreaming(true);
    startPolling();
  };

  const stopStreaming = () => {
    window.location.reload();
    axios
      .get("http://localhost:8000/analyst/stop_feed")
      .then((response) => {
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
          sendNotification(response.data); // Call sendNotification when carData is fetched
          if (response.data.is_stolen) {
            setShowRetrieveButton(true);
          } else {
            setShowRetrieveButton(false);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  };

  const sendNotification = (carData) => {
    const analystToken = cookies.get("analysttoken");
    axios
      .post("http://localhost:8000/analyst/send_notification", {
        token: analystToken,
        number_plate: carData.number_plate,
      })
      .then((response) => {
        console.log("Notification sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
      });
  };

  const handleRetrieve = () => {
    const analystToken = cookies.get("analysttoken");
    axios
      .post("http://localhost:8000/analyst/retrived_car_notification", {
        token: analystToken,
        number_plate: carData.number_plate,
      })
      .then((response) => {
        if (response.data === true) {
          setShowRetrieveButton(false);
        }
      })
      .catch((error) => {
        console.error("Error retrieving car notification:", error);
      });
  };

  const startPolling = () => {
    pollingIntervalRef.current = setInterval(fetchCarData, 7000); // Fetch data every 7 seconds
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
      return { background: "orange", color: "#514848" };
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
            {showRetrieveButton && (
              <button onClick={handleRetrieve}>
                Retrieve
              </button>
            )}
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

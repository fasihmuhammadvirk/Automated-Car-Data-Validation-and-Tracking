import React, { useRef, useState, useEffect } from "react";
import "./AuthorDashboard.css";
import Navbar from "./Navbar.js";
import logo from "../assets/logos.png";
import axios from "axios";

export default function AuthorDashboard() {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const [carData, setCarData] = useState(null);
  const pollingIntervalRef = useRef(null);

  const startStreaming = () => {
    const videoElement = videoRef.current;
    videoElement.src = "http://localhost:8000/author/video_feed";

    setStreaming(true);
    startPolling();
  };

  const stopStreaming = () => {
    axios
      .get("http://localhost:8000/author/stop_feed")
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
      .get("http://localhost:8000/author/get_car_data")
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

  return (
    <>
      <Navbar name={"Author"} />
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
          <div className="status" style={{ background: carData ? (carData.is_stolen || !carData.owner_tax_paid ? "red" : "green") : "yellow" }}>
          <span>
              {carData ? 
                (carData.is_stolen ? "Stolen" : "Not Stolen") + " / " + (carData.owner_tax_paid ? "Paid" : "Not Paid") 
                : "No Data"}
            </span>
          </div>
        </div>
        <div className="user-information-section">
          <div className="table">
            {!carData ? (
              <p>Loading data...</p>
            ) : carData ? (
              <table>
                <tbody>
                  <tr>
                    <td className="author">Owner Name</td>
                    <td className="message">{carData.owner_name}</td>
                  </tr>
                  <tr>
                    <td className="author">Owner Cnic</td>
                    <td className="message">{carData.owner_cnic}</td>
                  </tr>
                  <tr>
                    <td className="author">Car Number Plate</td>
                    <td className="message">{carData.number_plate}</td>
                  </tr>
                  <tr>
                    <td className="author">Stolen Status</td>
                    <td className="message" style={{ color: carData.is_stolen ? "red" : "green" }}>
                      {carData.is_stolen ? "Stolen" : "Not Stolen"}
                    </td>
                  </tr>
                  <tr>
                    <td className="author">Tax Status</td>
                    <td className="message" style={{ color: carData.owner_tax_paid ? "green" : "red" }}>
                      {carData.owner_tax_paid ? "Paid" : "Not Paid"}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No car data available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

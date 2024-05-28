import React, { useRef, useState } from "react";
import "./AuthorDashboard.css";
import Navbar from "./Navbar.js";
import logo from "../assets/logos.png";
import axios from "axios";
export default function AuthorDashboard() {
const videoRef = useRef(null);
const [streaming, setStreaming] = useState(false);

  const startStreaming = () => {
    const videoElement = videoRef.current;
    videoElement.src = "http://localhost:8000/author/video_feed";
    setStreaming(true);
  };

  const stopStreaming = () => {
    axios.get("http://localhost:8000/author/stop_feed")
    .then(response => {
      const videoElement = videoRef.current;
      videoElement.src = logo;
      setStreaming(false);
    })
    .catch(error => {
      console.error("Error stopping video stream:", error);
    });
  };

  return (
    <>
      <Navbar name={"Author"} />
      <div className="dashboard">
        <div className="camera-feed">
          <div className="camera-container">
                <img ref={videoRef} src = {logo} alt="Camera Feed" />
          </div>
          <div className="button-container">
            <button onClick={startStreaming} disabled={streaming}>
              Start Video
            </button>
            <button onClick={stopStreaming} disabled={!streaming}>
              Stop Video
            </button>
          </div>
          <div className="status">
            <span>Status</span>
          </div>
        </div>
        <div className="user-information-section">
          <div className="table">
            <table>
              <tbody>
                <tr>
                  <td className="author">Owner Name</td>
                  <td className="message">Fasih</td>
                </tr>
                <tr>
                  <td className="author">Owner Cnic</td>
                  <td className="message">3530100100000</td>
                </tr>
                <tr>
                  <td className="author">Car Number Plate</td>
                  <td className="message">YA895</td>
                </tr>
                <tr>
                  <td className="author">Stolen Status</td>
                  <td className="message">False</td>
                </tr>
                <tr>
                  <td className="author">Tax Status</td>
                  <td className="message">False</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

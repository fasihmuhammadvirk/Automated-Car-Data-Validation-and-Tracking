import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Report.css";
import ReportButton from "../assets/ReportButton.png"; // Corrected the path typo
import SuccessButton from "../assets/SuccessButton.png"; // Assume this is the success logo image
import Navbar from "./Navbar";

export default function Report() {
  const [isReported, setIsReported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [carStatus, setCarStatus] = useState(null);

  const usertoken = Cookies.get("usertoken"); // Retrieve token from cookies

  const checkCarStatus = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the status API to check if the car is stolen
      const response = await axios.post("http://127.0.0.1:8000/user/checkstatus/", {
        token: usertoken
      });

      const isCarStolen = response.data.is_stolen; // Assuming the response contains a 'is_stolen' field
      setCarStatus(isCarStolen);
      setIsReported(isCarStolen);
    } catch (err) {
      setError("An error occurred while checking the car status.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the API to report the stolen car
      await axios.post("http://127.0.0.1:8000/user/reportstolen/", {
        token: usertoken 
      });

      // Check the status again after reporting
      await checkCarStatus();
    } catch (err) {
      setError("An error occurred while reporting.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkCarStatus();
  }, []);

  return (
    <>
      <Navbar name="User" />
      <div className="report">
        <div className="container">
          <div className="heading">
            <p>
              {isReported 
                ? `Your report has been submitted. Car status: ${carStatus ? "Stolen" : "Not stolen"}` 
                : "Press the Image to Report"
              }
            </p>
            {error && <p className="error">{error}</p>}
          </div>
          <div className="logo">
            <img 
              src={isReported ? SuccessButton : ReportButton} 
              alt={isReported ? "Success Logo" : "Report Logo"} 
              onClick={handleClick} 
              disabled={isLoading}
            />
          </div>
          {isLoading && <p id="loading">Loading...</p>}
        </div>
      </div>
    </>
  );
}

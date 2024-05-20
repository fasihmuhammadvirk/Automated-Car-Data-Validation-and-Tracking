import React, { useState } from "react";
import "./Report.css";
import ReportButton from "../assets/ReportButton.png"; // Corrected the path typo
import SuccessButton from "../assets/SuccessButton.png"; // Assume this is the success logo image
import Navbar from "./Navbar";

export default function Report() {
  const [isReported, setIsReported] = useState(false);

  const handleClick = () => {
    setIsReported(true);
  };

  return (
    <>
      <Navbar name="User" />
      <div className="report">
        <div className="container">
          <div className="heading">
            <p>{isReported ? "Your report has been submitted" : "Press the Image to Report"}</p>
          </div>
          <div className="logo">
              <img 
                src={isReported ? SuccessButton : ReportButton} 
                alt={isReported ? "Success Logo" : "Report Logo"} 
                onClick={handleClick} 
              />
          </div>
        </div>
      </div>
    </>
  );
}

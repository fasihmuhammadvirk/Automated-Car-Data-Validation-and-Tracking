import React, { useState } from "react";
import "./UserDashboard.css";
import Navbar from "./Navbar.js";
import Plus from "../assets/Plus.png";

export default function UserDashboard() {
  const [carNumberPlate, setCarNumberPlate] = useState("");
  const [carImage, setCarImage] = useState(null);

  const handleCarNumberPlateChange = (event) => {
    setCarNumberPlate(event.target.value);
  };

  const handleCarImageChange = (event) => {
    setCarImage(event.target.files[0]);
  };

  return (
    <>
      <Navbar name="User" />
      <div className="UserDashboard">
        <div className="container">
          <p id="title">Car Details</p>
          <input
            className="input"
            type="text"
            id="carnoplate"
            placeholder="Enter Number Plate..."
            value={carNumberPlate}
            onChange={handleCarNumberPlateChange}
          />
          <p id="title">Car Image</p>
          <label  htmlFor="carimage" className="custom-file-upload">
            <span className="text">Upload Image</span>
            <img src={Plus} alt="Car Logo" />
          </label>
          <input
            type="file"
            id="carimage"
            accept="image/*"
            onChange={handleCarImageChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </>
  );
}

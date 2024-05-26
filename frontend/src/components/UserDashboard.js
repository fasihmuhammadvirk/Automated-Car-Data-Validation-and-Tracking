import React, { useState } from "react";
import axios from "axios";
import "./UserDashboard.css";
import Navbar from "./Navbar.js";
import Plus from "../assets/Plus.png";

export default function UserDashboard() {
  const [carNumberPlate, setCarNumberPlate] = useState("");
  const [carImage, setCarImage] = useState(null);
  const [carData, setCarData] = useState(null);
  const [carImagePreview, setCarImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCarNumberPlateChange = (event) => {
    setCarNumberPlate(event.target.value);
  };

  const handleCarImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCarImage(file);
      setCarImagePreview(URL.createObjectURL(file));
    }
  };

  const fetchCarDataByNumberPlate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/user/cardetailtext/`,
        {
          number_plate: carNumberPlate,
        }
      );
      setCarData(response.data);
    } catch (error) {
      console.error("Error fetching car data by number plate:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCarDataByImage = async () => {
    if (!carImage) return;

    const formData = new FormData();
    formData.append("image", carImage);

    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/user/cardetailimage/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCarData(response.data);
    } catch (error) {
      console.error("Error fetching car data by image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    setCarData(null);
    setCarNumberPlate("");
    setCarImage(null);
    setCarImagePreview(null);
    setLoading(false);
  };

  return (
    <>
      <Navbar name="User" />
      <div className="UserDashboard">
        {!carData ? (
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
            <button className="button" onClick={fetchCarDataByNumberPlate}>
              Fetch Car Data by Number Plate
            </button>
            <p id="title">Car Image</p>
            {!carImagePreview && (
              <>
                <label htmlFor="carimage" className="custom-file-upload">
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
              </>
            )}
            {carImagePreview && (
              <div className="image-preview">
                <img src={carImagePreview} alt="Car" />
                <button className="button" onClick={() => setCarImagePreview(null)}>
                  Remove Image
                </button>
              </div>
            )}
            <button className="button" onClick={fetchCarDataByImage}>
              {loading ? "Loading... wait for 4 sec" : "Fetch Car Data by Image"}
            </button>
          </div>
        ) : (
          <div className="car-data-table">
            <div className="heading">
              <p className="title">Car Details</p>
              <button className="button" onClick={handleBackToDashboard}>
                Back
              </button>
            </div>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <th>Owner CNIC</th>
                    <td>{carData.owner_cnic}</td>
                  </tr>
                  <tr>
                    <th>Owner Name</th>
                    <td>{carData.owner_name}</td>
                  </tr>
                  <tr>
                    <th>Owner Father Name</th>
                    <td>{carData.owner_father_name}</td>
                  </tr>
                  <tr>
                    <th>Car Number Plate</th>
                    <td>{carData.number_plate}</td>
                  </tr>
                  <tr>
                    <th>Car Manufacture Name</th>
                    <td>{carData.make_name}</td>
                  </tr>
                  <tr>
                    <th>Year of Manufacture</th>
                    <td>{carData.year_of_manufacture}</td>
                  </tr>
                  <tr>
                    <th>Vehicle Price</th>
                    <td>{carData.vehicle_price}</td>
                  </tr>
                  <tr>
                    <th>Token ID</th>
                    <td>{carData.token}</td>
                  </tr>
                  <tr>
                    <th>Owner City</th>
                    <td>{carData.owner_city}</td>
                  </tr>
                  <tr>
                    <th>Tax Paid</th>
                    <td>{carData.owner_tax_paid ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th>Engine Number</th>
                    <td>{carData.engine_number}</td>
                  </tr>
                  <tr>
                    <th>Register Date</th>
                    <td>{carData.register_date}</td>
                  </tr>
                  <tr>
                    <th>Color</th>
                    <td>{carData.color}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}

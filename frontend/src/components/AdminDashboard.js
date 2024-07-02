import React, { useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import Navbar from "./Navbar.js";

export default function AdminNotification() {
  const initialFormData = {
    official_id: "",
    location: "",
    name: "",
    password: "",
    contact: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyst/signup", formData);
      if (response.data.success) { // Adjust this condition based on your API's response
        alert("Analyst signed up successfully!");
        setFormData(initialFormData); // Clear form fields
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("There was an error signing up the analyst!", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar name={"Admin"} />
      <div className="admin-notification">
        <h1 className="title">Analyst Form</h1>
        <p className="description">Enter the details below to Signup an Analyst</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="official_id"
              name="official_id"
              placeholder="Official ID"
              value={formData.official_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Analyst Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Contact Info"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="button" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

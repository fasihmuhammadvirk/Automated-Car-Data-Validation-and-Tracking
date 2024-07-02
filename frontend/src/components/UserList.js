// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css';
import Navbar from "./Navbar.js";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual API endpoint
    axios.get('http://127.0.0.1:8000/admin/getuserslist')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
      <>
      <Navbar name={"Admin"} />
      <div className="userlist">
      <div className="container">
      <h2>Added Analyst List </h2>
      <div className="table">
      <table >
        <thead>
          <tr>
            <th>Official ID</th>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
              <tr key={index}>
              <td>{user.official_id}</td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>{user.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
          </>
  );
};

export default UserList;

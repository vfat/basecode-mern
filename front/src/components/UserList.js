import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setGlobalState, useGlobalState } from "./StateUser";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);
  const satusLogin = useGlobalState("login")
  const navigate = useNavigate();

  useEffect(() => {
    if(satusLogin[0]!=='admin'){
      navigate("/login");
    }
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async (id) => {
    try {
      setGlobalState("login",'none' )
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <Link to="add" className="button is-success">
          Add New
        </Link>
        <button
                    onClick={() => logOut()}
                    className="button is-danger"
        >
            Logout
        </button>
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.nama_lengkap}</td>
                <td>
                  <Link
                    to={`edit/${user._id}`}
                    className="button is-info is-small mr-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
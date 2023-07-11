import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setGlobalState, useGlobalState } from "./StateUser";

const EditUser = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [nama_lengkap, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const satusLogin = useGlobalState("login")

  useEffect(() => {
    if(satusLogin[0]!=='admin'){
      navigate("/login");
    }
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setUsername(response.data.username);
    setEmail(response.data.email);
    setFullname(response.data.nama_lengkap);
    setPassword(response.data.password);
    setAdmin(response.data.admin);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const regex = /^(?=.*?[A-Z])[a-zA-Z\d]{8,}$/;
    try {
      if(password.match(regex)){
        await axios.patch(`http://localhost:5000/users/${id}`, {
          username,
          email,
          nama_lengkap,
          password,
          admin
        });
        navigate("/");
      }
      else{
        alert("password harus terdiri dari 8 Karakter Alphanumeric dan harus mengandung setidaknya huruf kapital, tidak boleh mengandung special karakter.")
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                readOnly='yes'
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Full Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama_lengkap}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                minLength={8}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
          </div> 
          <div className="field">
            <label className="label">Admin</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </div>
          </div>          
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
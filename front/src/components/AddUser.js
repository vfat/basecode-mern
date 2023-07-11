import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setGlobalState, useGlobalState } from "./StateUser";


const AddUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nama_lengkap, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("user");
  const navigate = useNavigate();
  const satusLogin = useGlobalState("login")

  console.log(satusLogin[0])
  useEffect(() => {
    if(satusLogin[0]!=='admin'){
      navigate("/login");
    }

  }, []);

  const saveUser = async (e) => {
    e.preventDefault();
    const regex = /^(?=.*?[A-Z])[a-zA-Z\d]{8,}$/;
    try {
      if(password.match(regex)){
        var hasil = await axios.post("http://localhost:5000/users", {
          username,
          email,
          nama_lengkap,
          password,
          admin
        }).catch((err) => {
          alert(err.message)  
        });
        console.log(hasil)
       

        if(hasil.status===201){
          alert(hasil.data.message+' -- '+hasil.status) 
        }
        else{
          navigate("/");
        }
        

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
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
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
                pattern="(?=.*?[A-Z])[a-zA-Z\d]{8,}"
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
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default AddUser;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setGlobalState, useGlobalState } from "./StateUser";

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const satusLogin = useGlobalState("login")
  const loginUser = async (e) => {
    e.preventDefault();
    const regex = /^(?=.*?[A-Z])[a-zA-Z\d]{8,}$/;
    try {
      if(password.match(regex)){
        var hasil = await axios.post("http://localhost:5000/users/login", {
          username,
          password
        }).catch((err) => {
          alert(err.message)  
        });
        console.log(hasil.data.metadata.admin)
        
        console.log(satusLogin[0])
       

        if(hasil.status===201){
          alert(hasil.data.message+' -- '+hasil.status) 
        }
        else{
            setGlobalState("login",hasil.data.metadata.admin )
            if(hasil.data.metadata.admin==='admin'){
                navigate("/");
            }
            else{
                navigate("/buku");
            }
            
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
        <form onSubmit={loginUser}>
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
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                minLength={8}
                className="input"
                value={password}
                pattern="(?=.*?[A-Z])[a-zA-Z\d]{8,}$"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
          </div>          
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                login
              </button>

            </div>
          </div>
          <div className="field">
            <div className="control">

              <Link to="/register" className="button is-link">
                Register
              </Link>
            </div>
          </div>          
        </form>
      </div>
    </div>
    
  );
};

export default LoginUser;
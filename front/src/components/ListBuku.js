import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setGlobalState, useGlobalState } from "./StateUser";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);
  const satusLogin = useGlobalState("login")
  const navigate = useNavigate();

//   useEffect(() => {
//     if(satusLogin[0]==='none'){
//       navigate("/login");
//     }

//   }, []);


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
            LIST BUKU
      </div>
    </div>
  );
};

export default UserList;
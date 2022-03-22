import React, { useState } from 'react';
import logo from '../../Images/logo.png';
import './Join.css';
import { Link } from 'react-router-dom';
let user;
const Join = ()=>{
    const sendUser = ()=>{
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value = "";
    };
    const [name,setname]= useState("");
    return (<>
    <div className="JoinPage">
        <div className="JoinContainer">
            <img src={logo} alt="logo" />
            <h1>CHAT BOX</h1>
            <input type="text" placeholder='Enter Your Name' id="joinInput" onChange={(event)=>setname(event.target.value)} />
            <Link to='/chat' onClick={(event)=>!name?event.preventDefault():null}><button className="joinbtn" onClick={sendUser}>Login</button></Link>
        </div>
    </div>
    </>);
};
export {Join,user};
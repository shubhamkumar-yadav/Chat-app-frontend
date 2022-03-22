import React, { useEffect, useState } from 'react';
import { user } from '../join/Join';
import socketIo from 'socket.io-client';
import './Chat.css';
import sendLogo from '../../Images/send.png';
import closeIcon from '../../Images/closeIcon.png';
import { Message } from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
const ENDPOINT = 'http://localhost:4500/';
let socket;
const Chat = ()=>{
    const [id,setid] = useState("");
    const [messages,setmessages] = useState([]);
    const send =()=>{
        const message=document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value = "";
    };
    useEffect(()=>{
        socket = socketIo(ENDPOINT,{transports:['websocket']});
        socket.on('connect',()=>{
            setid(socket.id);
        })
        socket.emit('joined',{user});
        socket.on('welcome',(data)=>{
            setmessages([...messages,data]);
        })
        socket.on('userJoined',(data)=>{
            setmessages([...messages,data]);
        })
        socket.on('leave',(data)=>{
            setmessages([...messages,data]);
        })
        return ()=>{
            socket.emit('disconnected');
            socket.off();
        }
    },[]);
    useEffect(()=>{
        socket.on('sendMessage',(data)=>{
            setmessages([...messages,data]);
        })
        return ()=>{
            socket.off();
        }
    },[messages]);
    return (<>
    <div className="chatPage">
        <div className="chatContainer">
            <div className="header">
                <h2>CHAT BOX</h2>
                <a href="/"><img src={closeIcon} alt="Close" /></a>
            </div>
            <ReactScrollToBottom className="chatBox">
                {messages.map((item)=><Message user={item.id === id ?'':item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
            </ReactScrollToBottom>
            <div className="inputBox">
                <input onKeyPress={(event) =>event.key==='Enter'?send():null} type="text" id="chatInput" />
                <button className="sendBtn" onClick={send}><img src={sendLogo} alt="SendLogo" /></button>
            </div>
        </div>
    </div>
    </>);
};
export {Chat};
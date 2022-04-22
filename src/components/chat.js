import React, { useState, useEffect, useRef } from 'react'
import Socket from './socket';

export const Chat = ({name}) => {
  const [message, setMessage] = useState('Que se dice gonorreas');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Socket.emit('connected', name);
  }, [name]);

  useEffect(() => {
    Socket.on("message", (message) => {
      setMessages([...messages, message]);
    })
    console.log('Chat component mounted');
    return () => {
      Socket.off();
    };
  }, [messages]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Socket.emit('message', name, message);
    setMessage('');

    console.log('message from server: ', messages);
  }

  return (
    <div>
      <h1>Chat App</h1>
      <div className='chat'>
        <ul>
          {messages?.map((message, index) => (
            <li key={index}>{message.name}: {message.message}</li>
          ))}
        </ul>
        <div ref={divRef}></div>

      </div>
      <form onSubmit={handleSubmit}>
        <textarea cols="30"
          rows="10" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

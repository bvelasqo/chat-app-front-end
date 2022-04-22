import React, { useState } from 'react';
import './App.css';
import { Chat } from './components/chat';
import Socket from './components/socket';
function App() {
  const [name, setName] = useState('');
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      setRegister(true);
      Socket.emit('connected', name);
    }
  }

  return (
    <div className="App">
     {!register && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Introduzca su nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button>Ir al chat</button>
        </form>
      )}

      {register && <Chat name={name} />}
    </div>
  );
}

export default App;

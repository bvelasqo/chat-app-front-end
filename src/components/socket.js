import io from 'socket.io-client';

let Socket = io('http://localhost:3001');

export default Socket;
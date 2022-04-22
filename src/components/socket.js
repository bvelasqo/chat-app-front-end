import io from 'socket.io-client';

let Socket = io('https://chat-app-bvelasqo.herokuapp.com');

export default Socket;
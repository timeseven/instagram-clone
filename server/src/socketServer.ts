import { ISocket } from "./config/interface";
import { Socket } from "socket.io";

let users: Array<ISocket> = [];

interface checkUserOnline {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
  auth: string;
}

const SocketServer = (socket: Socket) => {
  // Connect
  socket.on("joinUser", (data) => {
    if (data?.length > 0) {
      const userIndex = users.findIndex((item) => item.id === data![0].auth);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], socketId: socket.id };
      } else {
        users.push({
          id: data![0].auth,
          socketId: socket.id,
          online: data.map((obj: checkUserOnline) => obj._id),
        });
      }
    }
  });

  // Create a Message
  socket.on("createMessage", (msg) => {
    const user = users.find((user) => user.id === msg.recipient._id);
    user && socket.to(`${user.socketId}`).emit("createMessageToClient", msg);
  });
};

export default SocketServer;

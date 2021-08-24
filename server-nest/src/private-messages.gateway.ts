import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

type AuthSocket = Socket & {username: string};

@WebSocketGateway({cors: {origin: 'http://localhost:8080'}})
export class PrivateMessagesGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  io: Server;

  handleConnection(socket: AuthSocket, ...args: any[]) {
    const users = [];
    for (let [id, connectedSocket] of this.io.of('/').sockets) {
      users.push({
        userID: id,
        username: (connectedSocket as AuthSocket).username
      });
    }

    socket.emit('users', users);

    socket.broadcast.emit('user connected', {
      userID: socket.id,
      username: socket.username
    });
  }

  handleDisconnect(socket: Socket) {
    socket.broadcast.emit('user disconnected', socket.id);
  }

  @SubscribeMessage('private message')
  privateMessage(@ConnectedSocket() socket: Socket, @MessageBody() { content, to }) {
    socket.to(to).emit('private message', {
      content,
      from: socket.id
    });
  }
  
}
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';

export class AuthSocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options) as Server;
    server.use((socket, next) => {
      const username = socket.handshake.auth.username;
      if (!username) {
        next(new Error('Invalid username'))
      }
      socket['username'] = username;
      next();
    })

    return server;
  }
}
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificacionGateway {

  @WebSocketServer()
  server: Server;

  enviarNotificacion(data: any) {
    this.server.emit('notificacionNueva', data);// Emitir la notificación usando el método del Gateway
  }
}

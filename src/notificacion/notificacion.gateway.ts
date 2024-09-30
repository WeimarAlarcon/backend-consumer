import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificacionService } from './notificacion.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificacionGateway {

  // constructor(private readonly notificacionService: NotificacionService) { }

  @WebSocketServer()
  server: Server;

  enviarNotificacion(data: any) {
    this.server.emit('notificacionNueva', data);// Emitir la notificación usando el método del Gateway
  }

  // @SubscribeMessage('notificacionLeida')
  // estadoNotificacion(@MessageBody() id: number): Promise<any> {
  //   console.log('Mensaje recibido:', id);
  //   const resp = this.notificacionService.estadoNotificacion(id); // Emitir la notificación usando el método del Gateway
  //   return resp;
  // }
}

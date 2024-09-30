import { Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { NotificacionController } from './notificacion.controller';
import { Notificacion } from './entities/notificacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificacionGateway } from './notificacion.gateway';

@Module({
  controllers: [NotificacionController],
  providers: [NotificacionService, NotificacionGateway],
  imports: [
    TypeOrmModule.forFeature([Notificacion]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'consumer-client-id', // Id del cliente
            brokers: ['localhost:9092'], // Kafka corriendo en tu Docker,
            connectionTimeout: 30000,  // 30 segundos de espera para la conexión
            // authenticationTimeout: 1000,  // Tiempo de espera para la autenticación (1 segundo)
            // reauthenticationThreshold: 10000,  // Tiempo para volver a autenticarse (10 segundos)
            retry: {
              retries: 10,  // Número de reintentos
              initialRetryTime: 300,  // Tiempo de espera inicial para reintentos (ms)
            },
          },
          consumer: {
            groupId: 'consumer-group', // Nombre del grupo de consumidores
            heartbeatInterval: 3000, // Intervalo de heartbeat en milisegundos (3 segundos)
            sessionTimeout: 30000, // Timeout de la sesión en milisegundos (30 segundos)
            rebalanceTimeout: 60000, // Timeout para la operación de rebalancing
          },
        },
      },
    ]),
  ]
})
export class NotificacionModule {}

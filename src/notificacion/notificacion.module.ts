import { Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { NotificacionController } from './notificacion.controller';
import { Notificacion } from './entities/notificacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [NotificacionController],
  providers: [NotificacionService],
  imports: [
    TypeOrmModule.forFeature([Notificacion]),
  ]
})
export class NotificacionModule {}

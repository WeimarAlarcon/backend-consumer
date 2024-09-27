import { Injectable } from '@nestjs/common';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

@Injectable()
export class NotificacionService {
  async create(createNotificacionDto: CreateNotificacionDto) {
    return await 'This action adds a new notificacion';
  }

  async findAll() {
    return await `This action return awaits all notificacion`;
  }

  async findOne(id: number) {
    return await `This action return awaits a #${id} notificacion`;
  }

  async update(id: number, updateNotificacionDto: UpdateNotificacionDto) {
    return await `This action updates a #${id} notificacion`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} notificacion`;
  }
}

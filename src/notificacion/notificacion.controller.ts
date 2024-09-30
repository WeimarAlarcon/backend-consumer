import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('notificaciones')
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  @Post()
  async create(@Body() createNotificacionDto: CreateNotificacionDto) {
    return await this.notificacionService.create(createNotificacionDto);
  }

  @Get()
  async findAll() {
    return await this.notificacionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.notificacionService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNotificacionDto: UpdateNotificacionDto) {
    return await this.notificacionService.update(+id, updateNotificacionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notificacionService.remove(+id);
  }

  @MessagePattern('persona.enviada')
  async registrar(@Payload() data: any) {
    const createNotificacionDto = new CreateNotificacionDto();
    createNotificacionDto.persona = data; 
    return await this.notificacionService.create(createNotificacionDto);
  }

  // @MessagePattern('persona.enviada')
  // async mensajeRecibido(data: any) {
  //   return await this.notificacionService.MesajeRecibido(data);
  // }
}

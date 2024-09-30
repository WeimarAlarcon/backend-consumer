import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { Repository } from 'typeorm';
import { NotificacionGateway } from './notificacion.gateway';

@Injectable()
export class NotificacionService {

  constructor(
    @InjectRepository(Notificacion)
    private notificacionRepository: Repository<Notificacion>,

    @Inject()
    private notificacionGateway: NotificacionGateway,

  ) {}

  async create(createNotificacionDto: CreateNotificacionDto) {
    const nuevaNotificacion = this.notificacionRepository.create({
      fechaHora: new Date(),  // Asignar la fecha actual
      estado: true,  // Estado inicial
      persona: createNotificacionDto.persona,  // Asignar el objeto persona
      mensaje: `Nueva persona ci:${createNotificacionDto.persona.carnetIdentidad} Nombre: ${createNotificacionDto.persona.nombre}
        ${createNotificacionDto.persona.apellidoPaterno} ${createNotificacionDto.persona.apellidoMaterno}`,  // Asignar el mensaje
    });

    // Guardar la notificación en la base de datos
    const notificacionGuardada  = await this.notificacionRepository.save(nuevaNotificacion);
    this.notificacionGateway.enviarNotificacion(notificacionGuardada);
    // Retornar la notificación guardada
    return notificacionGuardada ;
  }

  async findAll() {
    const notificaciones = await this.notificacionRepository.find({
      order: {
        id: 'DESC', // Cambia a 'DESC' si necesitas el más reciente primero
      },
    });
    return notificaciones;
  }

  async findOne(id: number) {
    const notificacion = await this.notificacionRepository.findOneBy({id});
    return notificacion;
  }

  async update(id: number, updateNotificacionDto: UpdateNotificacionDto) {
    return await `This action updates a #${id} notificacion`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} notificacion`;
  }

  async estadoNotificacion(id: number) {
    const notificacion = await this.notificacionRepository.findOneBy({ id, estado: false });
    if (!notificacion) {
      throw new Error('Notificación no encontrada o ya ha sido leída');
    }
    notificacion.estado = true;
    await this.notificacionRepository.save(notificacion);
    return notificacion;
  }


  // async estadoNotificacion(id: number) {
  //   const notificacion = await this.notificacionRepository.findOneBy({ id, estado: false });
  //   if (!notificacion) {
  //     throw new Error('Notificación no encontrada o ya ha sido leída');
  //   }
  //   notificacion.estado = true;
  //   await this.notificacionRepository.save(notificacion);
  //   return notificacion;
  // }
  // async modelar(data: any) {
  //   const createNotificacionDto: CreateNotificacionDto = new CreateNotificacionDto();
  //   createNotificacionDto.fechaHora = new Date();
  //   createNotificacionDto.mensaje = data.mensaje;
  //   createNotificacionDto.estado = true;
  //   createNotificacionDto.persona = data;
  //   console.log('Modelando:', createNotificacionDto);
  //   return await `Modelando: ${data}`;
  // }

  // async MesajeRecibido(data: any) {
  //   console.log('Mensaje recibido:', data);
  //   return await `Mensaje recibido: ${data}`;
  // }
}

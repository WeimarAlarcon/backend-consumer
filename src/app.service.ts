import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    // Asegúrate de que estás suscrito al tópico correcto
    await this.kafkaClient.connect();
  }

  // Este método manejará los mensajes entrantes del tópico "product.created"
  @MessagePattern('product.created')
  handleProductCreated(@Payload() message: any) {
    console.log('Mensaje recibido:', message);
  }

  getHello(): string {
    return 'Hello World!';
  }
}

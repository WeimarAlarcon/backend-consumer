import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    // Asegúrate de que estás suscrito al tópico correcto
    this.kafkaClient.subscribeToResponseOf('product.created');
    await this.kafkaClient.connect();
  }

  // Este método manejará los mensajes entrantes del tópico "product.created"
  @EventPattern('product.created')
  handleProductCreated(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('Mensaje recibido:', message);
    const originalMessage = context.getMessage();
    console.log('Contexto del mensaje:', originalMessage);
  }

  getHello(): string {
    return 'Hello World!';
  }
}

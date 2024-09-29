import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('product.created')
  handleMessage(@Payload() message: any) {
    this.appService.handleProductCreated(message);
    console.log('Received message:', message);
    return message.value;
  }
}

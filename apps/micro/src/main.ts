import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { MICRO_STRING } from 'constants/service.constant';
import { RmqService } from 'libs/common/src/';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger()
  const configService = app.get(ConfigService);
 
  // const user = configService.get('RMQ_USER');
  // const password = configService.get('RMQ_PASSWORD');
  // const host = configService.get('RMQ_HOST');
  // const queueName = configService.get('RMQ_QUEUE_NAME');
  // const rqmPort = configService.get('RMQ_PORT')
 
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('micro', false))
  
  // logger.log(`RQM_SERVICE has been initialzied at ${host}/${rqmPort}`)
  const port = configService.get<string>('MICRO_PORT');
  console.log("MICRO_PORT ", port)

  await app.startAllMicroservices();
  await app.listen(port);

}
bootstrap();

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const configService = app.get(ConfigService);
  const port = configService.get('ORDERS_PORT');
  console.log("ORDERS_PORT ", port)
  await app.listen(port);
}
bootstrap();

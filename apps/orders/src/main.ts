import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const configService = app.get(ConfigService);
  const port = configService.get('ORDER_PORT');
  console.log("ORDER_PORT ", port)
  await app.listen(port);
}
bootstrap();

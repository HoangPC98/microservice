import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PAYMENT_PORT')
  console.log("PAYMENT_PORT ", port)
  await app.listen(port);
}
bootstrap();

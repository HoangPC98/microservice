import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const port = configService.get<string>('MICRO_PORT');
  console.log("MICRO_PORT ", port)
  await app.listen(port);
}
bootstrap();

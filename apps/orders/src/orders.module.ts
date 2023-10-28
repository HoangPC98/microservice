import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ConditionalModule, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ],
  providers: [OrdersService],
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { MICRO_STRING, ORDERS_APP } from 'constants/service.constant';
import { OrdersModule } from 'apps/orders/src/orders.module';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { RmqModule, RmqService } from 'libs/common/src';
import { OrdersService } from 'apps/orders/src/orders.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    RmqModule.register({name: MICRO_STRING}),
    OrdersModule
  ],
  exports: [RmqModule],
  controllers: [AppController],

  providers: [
    AppService,
    // OrdersService,
    {
      provide: MICRO_STRING,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          
        });
      },
      inject: [ConfigService],
    }
  ],
})
export class AppModule { }

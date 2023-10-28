import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ConditionalModule, ConfigModule, ConfigService } from '@nestjs/config';
import { MICRO_STRING, ORDERS_APP } from 'constants/service.constant';
import { OrderController } from './order.controller';
import * as Joi from 'joi';
import { RmqModule } from 'libs/common/src';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        RMQ_HOST: Joi.string().required(),
        RMQ_QUEUE_NAME: Joi.string().required(),
      })
    }),
    RmqModule.register({name: ORDERS_APP})
  ],
  exports: [RmqModule],
  controllers: [OrderController],
  providers: [OrdersService,
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
export class OrdersModule { }

import { DynamicModule, Module } from "@nestjs/common";
import { RmqService } from "./rabbitmq.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { MICRO_STRING } from "constants/service.constant";

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService],
  exports: [RmqService]
})
export class RmqModule {
  static register({ name: queueName }: RmqModuleOptions): DynamicModule {
    console.log('queue_name', queueName)
    return {
      module: RmqModule,
      imports: [
        ClientsModule.register([
          {
            name: MICRO_STRING,
            // useFactory: (configService: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://guest:guest@localhost:5672`],
              queue: 'micro',
              queueOptions: {
                durable: false
              },
            }
						// }),
						// inject: [ConfigService]
          }
        ])
      ],
      exports: [ClientsModule]
    }
  }
}
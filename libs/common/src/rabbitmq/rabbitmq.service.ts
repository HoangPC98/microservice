import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";

@Injectable()
export class RmqService {
  constructor(
    private readonly configService: ConfigService
  ){}

  getOptions(queue: string, noAck= false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {  
        urls : [`amqp://guest:guest@localhost:5672`],
        queue: queue ? queue : 'micro',
        noAck: noAck || false,
        persistent: true
      }
    }
  } 
}
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MICRO_STRING, ORDERS_APP } from 'constants/service.constant';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(MICRO_STRING) private readonly orderClient: ClientProxy

  ) { }
  readonly logger = new Logger(OrdersService.name)
  async createOrderListen(body: any) {
    this.logger.debug('CREATE...ORDERS...', body)
    return {
      code: 200,
      data: 'ok'
    }
  }

  async createOrderReceive(body: any) {
    this.logger.debug('CREATE...ORDERS...', body)
    return {
      code: 200,
      data: 'ok'
    }
  }

  @EventPattern('create_orders')
  async handleOrderCreate(@Payload() data: any, @Ctx() ctx: RmqContext) {
    console.log('Data...', data)
    console.log('DataCTX...', ctx.getMessage())

  }
}

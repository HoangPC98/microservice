import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersService } from 'apps/orders/src/orders.service';
import { MICRO_STRING, ORDERS_APP } from 'constants/service.constant';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject(MICRO_STRING) private readonly microClient: ClientProxy
  ) {
  }
  readonly logger = new Logger(AppService.name)
  async createOrders(body: any) {
    try {
      console.log("CREATE...", body)
      const resultEmit = this.microClient.emit('create_orders', {
        ...body
      })

      console.log('result_emit...', resultEmit)

      // const resultSend = this.microClient.send('create_orders_send', {
      //   ...body
      // })
      // console.log('result_send...', resultSend)
    } catch (error) {
      this.logger.error('Eroro', error)
    }

  }
}

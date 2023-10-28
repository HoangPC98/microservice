import { Body, Controller, Get, Post } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @EventPattern('create_orders')
  async handleCreateOrders(@Payload() payloadCreate: any, @Ctx() ctx: RmqContext) {
    console.log('create_orders...', ctx.getMessage())
    await this.orderService.createOrderListen(payloadCreate)
  }

  @MessagePattern('create_orders_send')
  async handleCreateOrdersSend(@Payload() payloadCreate: any, @Ctx() ctx: RmqContext) {
    console.log('create_orders...', ctx.getMessage())
    await this.orderService.createOrderReceive(payloadCreate)
  }
}

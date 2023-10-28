import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/new-orders')
  async makeNewOrders(@Body() body: any) {
    return await this.appService.createOrders(body);
  }
}

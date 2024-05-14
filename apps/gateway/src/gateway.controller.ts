import { Controller, Get, Param } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('/user/:id')
  getHello(@Param('id') id: string) {
    return this.gatewayService.getUser(id);
  }

  @Get('/some-event')
  eventTest() {
    this.gatewayService.eventTest(44);
    return 'Action caused event in UserService';
  }
}

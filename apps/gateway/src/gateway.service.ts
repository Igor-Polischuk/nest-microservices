import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}
  getUser(id: string) {
    return this.client.send({ cmd: 'GET_USER' }, id);
  }

  eventTest(payload: number) {
    return this.client.emit('USER_EVENT', payload);
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class CaseService {
  getHello(): string {
    return 'Hello World!';
  }
}

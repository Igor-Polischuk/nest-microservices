import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { callGrpcService } from 'libs/common';
import {
  Case,
  CASE_PACKAGE_NAME,
  CASE_SERVICE_NAME,
  CaseServiceClient,
} from 'proto/case';

@Injectable()
export class CaseService {
  private caseGrpcService: CaseServiceClient;
  constructor(@Inject(CASE_PACKAGE_NAME) private grpcClient: ClientGrpc) {
    this.caseGrpcService =
      grpcClient.getService<CaseServiceClient>(CASE_SERVICE_NAME);
  }
  getCase(id: string): Promise<Case> {
    return callGrpcService(this.caseGrpcService.getCase({ id }));
  }
}

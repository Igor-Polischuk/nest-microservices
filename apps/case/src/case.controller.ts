/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { CaseService } from './case.service';
import {
  ApplyForTheCaseDto,
  ApproveUsersDto,
  Case,
  CaseArray,
  CaseServiceController,
  CaseServiceControllerMethods,
  CreateCaseDto,
  DeleteCaseDto,
  GetCaseDto,
  GetCasesDto,
  UpdateCaseDto,
} from 'proto/case';
import { Observable } from 'rxjs';

@Controller()
@CaseServiceControllerMethods()
export class CaseController implements CaseServiceController {
  constructor(private readonly caseService: CaseService) {}
  createCase(request: CreateCaseDto): Promise<Case> | Observable<Case> | Case {
    throw new Error('Method not implemented.');
  }
  updateCase(request: UpdateCaseDto): Promise<Case> | Observable<Case> | Case {
    throw new Error('Method not implemented.');
  }
  getCase({ id }: GetCaseDto): Promise<Case> | Observable<Case> | Case {
    return this.caseService.getCase(id);
  }
  getCases(
    request: GetCasesDto,
  ): Promise<CaseArray> | Observable<CaseArray> | CaseArray {
    throw new Error('Method not implemented.');
  }
  deleteCase(request: DeleteCaseDto): Promise<Case> | Observable<Case> | Case {
    throw new Error('Method not implemented.');
  }
  approveUsers(
    request: ApproveUsersDto,
  ): Promise<Case> | Observable<Case> | Case {
    throw new Error('Method not implemented.');
  }
  applyForTheCase(
    request: ApplyForTheCaseDto,
  ): Promise<Case> | Observable<Case> | Case {
    throw new Error('Method not implemented.');
  }
}

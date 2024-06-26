import { Injectable } from '@nestjs/common';
import { Case, CaseStatus, CaseType, LocationType } from 'proto/case';

@Injectable()
export class CaseService {
  async getCase(id: string): Promise<Case> {
    const mockedCase: Case = {
      approvedCandidates: [],
      author: {
        email: 'mock',
        id: '1',
        lastName: 'mock',
        name: 'mock',
        password: 'hehe',
      },
      id,
      status: CaseStatus.Pending,
      title: '',
      description: '',
      type: CaseType.HelpRequest,
      locationType: LocationType.Offline,
      candidates: [],
      tags: [],
    };

    return mockedCase;
  }
}

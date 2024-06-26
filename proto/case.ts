// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.175.1
//   protoc               v3.20.3
// source: case.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { User } from "./user";

export const protobufPackage = "user";

export enum CaseStatus {
  Pending = 0,
  InProgress = 1,
  Closed = 2,
  UNRECOGNIZED = -1,
}

export enum CaseType {
  HelpRequest = 0,
  EventRequest = 1,
  SocietyRequest = 2,
  UNRECOGNIZED = -1,
}

export enum LocationType {
  Offline = 0,
  Online = 1,
  UNRECOGNIZED = -1,
}

export interface Case {
  id: string;
  author: User | undefined;
  status: CaseStatus;
  title: string;
  description: string;
  type: CaseType;
  locationType: LocationType;
  candidates: Candidates[];
  approvedCandidates: User[];
  tags: string[];
  radius?: number | undefined;
  lat?: number | undefined;
  lon?: number | undefined;
  url?: string | undefined;
}

export interface CaseArray {
  cases: Case[];
}

export interface Candidates {
  user: User | undefined;
  message: string;
}

export interface CreateCaseDto {
  author: User | undefined;
  title: string;
  description: string;
  type: CaseType;
  locationType: LocationType;
  tags: string[];
  radius?: number | undefined;
  lat?: number | undefined;
  lon?: number | undefined;
  url?: string | undefined;
}

export interface UpdateCaseDto {
  title?: string | undefined;
  description?: string | undefined;
  type?: CaseType | undefined;
  locationType?: LocationType | undefined;
  tags: string[];
  radius?: number | undefined;
  lat?: number | undefined;
  lon?: number | undefined;
  url?: string | undefined;
  status?: CaseStatus | undefined;
}

export interface GetCasesDto {
  filters: CasesFilters | undefined;
  skip: number;
  take: number;
}

export interface ApplyForTheCaseDto {
  caseId: string;
  message?: string | undefined;
}

export interface CasesFilters {
  type?: CaseType | undefined;
  locationType?: LocationType | undefined;
  radius?: number | undefined;
  tags: string[];
}

export interface ApproveUsersDto {
  users: User[];
  caseId: string;
}

export interface GetCaseDto {
  id: string;
}

export interface DeleteCaseDto {
  id: string;
}

export const USER_PACKAGE_NAME = "user";

export interface CaseServiceClient {
  createCase(request: CreateCaseDto): Observable<Case>;

  updateCase(request: UpdateCaseDto): Observable<Case>;

  getCase(request: GetCaseDto): Observable<Case>;

  getCases(request: GetCasesDto): Observable<CaseArray>;

  deleteCase(request: DeleteCaseDto): Observable<Case>;

  approveUsers(request: ApproveUsersDto): Observable<Case>;

  applyForTheCase(request: ApplyForTheCaseDto): Observable<Case>;
}

export interface CaseServiceController {
  createCase(request: CreateCaseDto): Promise<Case> | Observable<Case> | Case;

  updateCase(request: UpdateCaseDto): Promise<Case> | Observable<Case> | Case;

  getCase(request: GetCaseDto): Promise<Case> | Observable<Case> | Case;

  getCases(request: GetCasesDto): Promise<CaseArray> | Observable<CaseArray> | CaseArray;

  deleteCase(request: DeleteCaseDto): Promise<Case> | Observable<Case> | Case;

  approveUsers(request: ApproveUsersDto): Promise<Case> | Observable<Case> | Case;

  applyForTheCase(request: ApplyForTheCaseDto): Promise<Case> | Observable<Case> | Case;
}

export function CaseServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createCase",
      "updateCase",
      "getCase",
      "getCases",
      "deleteCase",
      "approveUsers",
      "applyForTheCase",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CaseService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CaseService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CASE_SERVICE_NAME = "CaseService";
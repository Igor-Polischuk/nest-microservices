// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.175.1
//   protoc               v3.20.3
// source: proto/user.proto
/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface FindOneUserDto {
  id: string;
}

export interface CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findUserById(request: FindOneUserDto): Observable<User>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findUserById(request: FindOneUserDto): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findUserById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";

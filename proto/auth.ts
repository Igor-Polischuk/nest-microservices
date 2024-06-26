// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.175.1
//   protoc               v3.20.3
// source: auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { BoolValue } from "./google/protobuf/wrappers";
import { CreateUserDto, User } from "./user";

export const protobufPackage = "auth";

export interface SignInDto {
  email: string;
  password: string;
}

export interface LogOutDTO {
  refreshToken: string;
}

export interface RefreshTokenDTO {
  refreshToken: string;
}

export interface VerifyAccessTokenDTO {
  accessToken: string;
}

export interface TokensDTO {
  refreshToken: string;
  accessToken: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  signIn(request: SignInDto): Observable<TokensDTO>;

  refreshToken(request: RefreshTokenDTO): Observable<TokensDTO>;

  signUp(request: CreateUserDto): Observable<TokensDTO>;

  logOut(request: LogOutDTO): Observable<BoolValue>;

  verifyAccessToken(request: VerifyAccessTokenDTO): Observable<User>;
}

export interface AuthServiceController {
  signIn(request: SignInDto): Promise<TokensDTO> | Observable<TokensDTO> | TokensDTO;

  refreshToken(request: RefreshTokenDTO): Promise<TokensDTO> | Observable<TokensDTO> | TokensDTO;

  signUp(request: CreateUserDto): Promise<TokensDTO> | Observable<TokensDTO> | TokensDTO;

  logOut(request: LogOutDTO): Promise<BoolValue> | Observable<BoolValue> | BoolValue;

  verifyAccessToken(request: VerifyAccessTokenDTO): Promise<User> | Observable<User> | User;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signIn", "refreshToken", "signUp", "logOut", "verifyAccessToken"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";

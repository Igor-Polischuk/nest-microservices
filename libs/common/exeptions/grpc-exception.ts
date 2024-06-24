import { RpcException } from '@nestjs/microservices';
import { GrpcError, grpcStatusNames } from './grpc-errors';
import { grpcToHttpStatusMap } from './grpc-to-rpc-code-map';

type GrpcExceptionParams = {
  message: string;
  code: GrpcError;
};

export type CommonRpcException = {
  code: number;
  details: string;
};

export class GrpcException extends RpcException {
  private readonly grpcErrorCode: GrpcError;

  constructor({ message, code }: GrpcExceptionParams) {
    super({ message, code });
    this.grpcErrorCode = code;
  }

  toHttp() {
    return {
      status: grpcToHttpStatusMap[this.grpcErrorCode],
      message: this.message,
      error: grpcStatusNames[this.grpcErrorCode],
    };
  }
}

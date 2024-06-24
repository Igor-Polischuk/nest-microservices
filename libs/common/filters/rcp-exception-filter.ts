import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CommonRpcException, GrpcException } from '../exeptions/grpc-exception';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.getError() as CommonRpcException;

    const httpError = new GrpcException({
      message: error.details,
      code: error.code,
    }).toHttp();

    response.status(httpError.status).json(httpError);
  }
}

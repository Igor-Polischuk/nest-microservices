import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CommonGrpcException, GrpcException } from 'libs/common/exceptions';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.getError() as CommonGrpcException;

    const httpError = new GrpcException({
      message: error.message,
      code: error.code,
    }).toHttp();

    response.status(httpError.status).json(httpError);
  }
}

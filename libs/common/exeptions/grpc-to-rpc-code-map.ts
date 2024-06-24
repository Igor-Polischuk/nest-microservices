import { GrpcError } from './grpc-errors';

export const grpcToHttpStatusMap: { [key in GrpcError]: number } = {
  [GrpcError.OK]: 200,
  [GrpcError.CANCELLED]: 499,
  [GrpcError.UNKNOWN]: 500,
  [GrpcError.INVALID_ARGUMENT]: 400,
  [GrpcError.DEADLINE_EXCEEDED]: 504,
  [GrpcError.NOT_FOUND]: 404,
  [GrpcError.ALREADY_EXISTS]: 409,
  [GrpcError.PERMISSION_DENIED]: 403,
  [GrpcError.RESOURCE_EXHAUSTED]: 429,
  [GrpcError.FAILED_PRECONDITION]: 400,
  [GrpcError.ABORTED]: 409,
  [GrpcError.OUT_OF_RANGE]: 400,
  [GrpcError.UNIMPLEMENTED]: 501,
  [GrpcError.INTERNAL]: 500,
  [GrpcError.UNAVAILABLE]: 503,
  [GrpcError.DATA_LOSS]: 500,
  [GrpcError.UNAUTHENTICATED]: 401,
};

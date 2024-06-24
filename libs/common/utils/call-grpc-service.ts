import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GrpcException } from '../exceptions/grpc-exception';

export function callGrpcService<T>(observable: Observable<T>): Promise<T> {
  return firstValueFrom(
    observable.pipe(
      catchError((error) => {
        return throwError(
          () => new GrpcException({ code: error.code, message: error.details }),
        );
      }),
    ),
  );
}

import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { Observable } from 'rxjs';
import { concatMap, map, mergeMap, toArray } from 'rxjs/operators';

type ValidateType = <T>() => {
  (source$: Observable<T>): Observable<T>;
  (source$: Observable<T[]>): Observable<T[]>;
};

export const validate$: ValidateType = () => (source$) =>
  source$.pipe(
    mergeMap((e) => (Array.isArray(e) ? e : [e])),
    concatMap(async (e) => {
      const errors = await validate(e as any);
      if (errors && errors.length) {
        throw new BadRequestException(errors);
      }
      return e;
    }),
    toArray(),
    map((e: any[]) => (e.length === 1 ? e[0] : e)),
  );

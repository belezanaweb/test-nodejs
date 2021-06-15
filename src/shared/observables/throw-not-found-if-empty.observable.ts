import { NotFoundException } from '@nestjs/common';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, throwIfEmpty } from 'rxjs/operators';

type Type = <K>() => (source$: Observable<K>) => Observable<K>;

export const throwNotFoundIfEmpty$: Type = () => (source$) =>
  source$.pipe(
    mergeMap((e) => (e ? of(e) : EMPTY)),
    throwIfEmpty(() => new NotFoundException()),
  ) as any;

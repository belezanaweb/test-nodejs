import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type TransformType = <T, K, J = K extends any[] ? T[] : T>(
  classToWrap: new () => T,
  options?: ClassTransformOptions,
) => (source$: Observable<K>) => Observable<J>;

export const transform$: TransformType = (classToWrap, options) => source$ =>
  source$.pipe(map(e => plainToClass(classToWrap, e, options))) as any;

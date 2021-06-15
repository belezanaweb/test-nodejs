import { from, isObservable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { transform$ } from '../observables/transform.observable';

export function BindDocTo<T>(classBind: new () => T) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method: (...args) => Promise<T> | Observable<T> = descriptor.value;
    descriptor.value = function(...args) {
      const result = method.apply(this, args);
      const bindedResult = from(result).pipe(
        map(doc => JSON.parse(JSON.stringify(doc))),
        transform$(classBind),
      );

      if (isObservable(result)) {
        return bindedResult;
      }

      return bindedResult.toPromise();
    };
  };
}

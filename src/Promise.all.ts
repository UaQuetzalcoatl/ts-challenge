/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise
  
  ### Question
  
  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.
  
  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });
  
  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```
  
  > View on GitHub: https://tsch.js.org/20
*/


/* _____________ Your Code Here _____________ */

type Resolve<T> = T extends Promise<infer R> ? Resolve<R> : T
type ResolveAll<T extends readonly unknown[]> = T extends [infer F, ...infer R] ? [Resolve<F>, ...ResolveAll<R>] : []
declare function PromiseAll1<T extends readonly any[]>(values: readonly [...T]): Promise<ResolveAll<T>>
declare function PromiseAll<T extends readonly any[]>(values: readonly [...T]): Promise<{
  [key in keyof T]: Resolve<T[key]>
}>



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
]


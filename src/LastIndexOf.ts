/*
  5317 - LastIndexOf
  -------
  by jiangshan (@jiangshanmeta) #medium #array
  
  ### Question
  
  Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```
  
  For example:
  
  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```
  
  > View on GitHub: https://tsch.js.org/5317
*/


/* _____________ Your Code Here _____________ */

type ISSame<a, b> = (<T>() => T extends a ? 1 : 2) extends (<T>() => T extends b ? 1 : 2) ? true : false

type LastIndexOf<T extends any[], U, FoundIndex extends number = -1, acc extends 1[] = []> = T extends []
  ? FoundIndex
  : T extends [infer F, ...infer L]
    ? LastIndexOf<L, U, ISSame<F, U> extends true ? acc['length'] : FoundIndex, [...acc, 1]>
    : never 

type a = LastIndexOf<[string, any, 1, number, 'a', any, 1], any>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]


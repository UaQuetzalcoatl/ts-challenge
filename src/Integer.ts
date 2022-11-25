/*
  10969 - Integer
  -------
  by HuaBing (@hbcraft) #medium #template-literal
  
  ### Question
  
  Please complete type `Integer<T>`, type `T` inherits from `number`, if `T` is an integer return it, otherwise return `never`.
  
  > View on GitHub: https://tsch.js.org/10969
*/


/* _____________ Your Code Here _____________ */

type IsInteger<T extends string> = T extends `${string}.${infer L}` ? (L extends '0' ? true : false) : true

type Integer<T> = T extends number 
  ? (number extends T ? never : (IsInteger<`${T}`> extends true ? T : never) )
  : never


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'

let x = 1
let y = 1 as const


type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]

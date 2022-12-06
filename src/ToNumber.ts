/*
  300 - String to Number
  -------
  by Pig Fang (@g-plane) #hard #template-literal
  
  ### Question
  
  Convert a string literal to a number, which behaves like `Number.parseInt`.
  
  > View on GitHub: https://tsch.js.org/300
*/

type Digits = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';
type ValidateNumber<T extends string> = T extends `${infer F}${infer L}` ? (F extends Digits ? ValidateNumber<L> : false) : true

/* _____________ Your Code Here _____________ */
type ToNumber<S extends string, acc extends any[] = []> = ValidateNumber<S> extends false ? never : `${acc["length"]}` extends S ? acc['length'] : ToNumber<S, [...acc, 0]>

type test = ToNumber<'5'>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>,
]

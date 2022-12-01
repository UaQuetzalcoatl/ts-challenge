/*
  147 - C-printf Parser
  -------
  by Pig Fang (@g-plane) #hard #template-literal
  
  ### Question
  
  There is a function in C language: `printf`. This function allows us to print something with formatting. Like this:
  
  ```c
  printf("The result is %d.", 42);
  ```
  
  This challenge requires you to parse the input string and extract the format placeholders like `%d` and `%f`. For example, if the input string is `"The result is %d."`, the parsed result is a tuple `['dec']`.
  
  Here is the mapping:
  
  ```typescript
  type ControlsMap = {
    c: 'char',
    s: 'string',
    d: 'dec',
    o: 'oct',
    h: 'hex',
    f: 'float',
    p: 'pointer',
  }
  ```
  
  > View on GitHub: https://tsch.js.org/147
*/


/* _____________ Your Code Here _____________ */

type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

type Sanitize<S extends string, K extends string = '%'> = S extends `${infer H}%%%${infer T}` ? Sanitize<`${H}%${T}`> : S

type ParsePrintFormat<Input extends string> = Sanitize<Input> extends `${string}%${infer Key extends keyof ControlsMap}${infer Rest}` 
  ? [ControlsMap[Key], ...ParsePrintFormat<Rest>]
  : []

type a = ParsePrintFormat<'The result is %%%d.'>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
]

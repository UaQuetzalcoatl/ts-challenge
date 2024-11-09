/*
  30958 - Pascal's triangle
  -------
  by Aswin S Vijay (@aswinsvijay) #medium #array #math

  ### Question

  Given a number N, construct the Pascal's triangle with N rows.
  [Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

  > View on GitHub: https://tsch.js.org/30958
*/

type CreateArrWithLength<Length extends number, Result extends number[] = []> = Result['length'] extends Length
  ? Result
  : CreateArrWithLength<Length, [...Result, 0]>;
type Add<One extends number, Two extends number> = [...CreateArrWithLength<One>, ...CreateArrWithLength<Two>]['length'];

type MakeRow<T extends number[], Result extends number[] = []> = T extends [
  infer One extends number,
  infer Two extends number,
  ...infer Rest extends number[],
]
  ? [Add<One, Two>] extends [infer A extends number]
    ? MakeRow<[Two, ...Rest], [...Result, A]>
    : []
  : [1, ...Result, 1];

type LastArrElement<Arr extends number[][]> = Arr extends [...any, infer Last extends number[]] ? Last : never;

type Pascal<N extends number, Result extends number[][] = [[1]]> = Result['length'] extends N
  ? Result
  : Pascal<N, [...Result, MakeRow<LastArrElement<Result>>]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type A = Pascal<3>;
type B = MakeRow<[1]>;

type cases = [
  Expect<Equal<Pascal<1>, [[1]]>>,
  Expect<Equal<Pascal<3>, [[1], [1, 1], [1, 2, 1]]>>,
  Expect<Equal<Pascal<5>, [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]>>,
  Expect<
    Equal<
      Pascal<7>,
      [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1]]
    >
  >,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/30958/answer
  > View solutions: https://tsch.js.org/30958/solutions
  > More Challenges: https://tsch.js.org
*/

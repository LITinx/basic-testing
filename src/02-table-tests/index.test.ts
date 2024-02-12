import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 4, b: 4, action: Action.Subtract, expected: 0 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },

  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 6, b: 4, action: Action.Multiply, expected: 24 },

  { a: 4, b: 4, action: Action.Divide, expected: 1 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },

  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
];
const actionName = (action: Action) => {
  return action === '+'
    ? 'add'
    : action === '-'
    ? 'subtract'
    : action === '*'
    ? 'multiply'
    : action === '/'
    ? 'divide'
    : 'exponentiate';
};

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(`should ${actionName(action)} two numbers`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});

import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Subtract })).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Multiply })).toBe(10);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Exponentiate })).toBe(
      25,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: '23' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'f', b: 2, action: '23' })).toBe(null);
  });
});

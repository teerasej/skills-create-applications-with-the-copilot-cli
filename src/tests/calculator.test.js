const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator basic operations', () => {
  test('add: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiply: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('divide: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divide: throws on division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
  });
});

describe('Calculator extended operations', () => {
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo: throws on modulo by zero', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero is not allowed');
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('power: base raised to 0 = 1', () => {
    expect(power(5, 0)).toBe(1);
  });

  test('squareRoot: √16 = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot: √0 = 0', () => {
    expect(squareRoot(0)).toBe(0);
  });

  test('squareRoot: throws on negative number', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed');
  });
});

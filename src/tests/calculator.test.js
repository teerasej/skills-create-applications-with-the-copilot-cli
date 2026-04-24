const { calculate, modulo, power, squareRoot, OPERATIONS } = require("../calculator");

describe("calculator operations", () => {
  describe("addition", () => {
    test("adds the example values from the image", () => {
      expect(calculate("2", "+", "3")).toBe(5);
    });

    test("adds negative numbers", () => {
      expect(calculate("-5", "+", "-4")).toBe(-9);
    });

    test("adds decimal values", () => {
      expect(calculate("2.5", "+", "3.5")).toBe(6);
    });
  });

  describe("subtraction", () => {
    test("subtracts the example values from the image", () => {
      expect(calculate("10", "-", "4")).toBe(6);
    });

    test("subtracts to a negative result", () => {
      expect(calculate("4", "-", "10")).toBe(-6);
    });

    test("subtracts decimal values", () => {
      expect(calculate("5.5", "-", "2.25")).toBe(3.25);
    });
  });

  describe("multiplication", () => {
    test("multiplies the example values from the image", () => {
      expect(calculate("45", "*", "2")).toBe(90);
    });

    test("supports x as a multiplication operator", () => {
      expect(calculate("6", "x", "7")).toBe(42);
    });

    test("supports × as a multiplication operator", () => {
      expect(calculate("3", "×", "4")).toBe(12);
    });

    test("multiplies by zero", () => {
      expect(calculate("99", "*", "0")).toBe(0);
    });
  });

  describe("division", () => {
    test("divides the example values from the image", () => {
      expect(calculate("20", "/", "5")).toBe(4);
    });

    test("supports ÷ as a division operator", () => {
      expect(calculate("18", "÷", "3")).toBe(6);
    });

    test("returns fractional results", () => {
      expect(calculate("7", "/", "2")).toBe(3.5);
    });

    test("rejects division by zero", () => {
      expect(() => calculate("8", "/", "0")).toThrow(
        "Division by zero is not allowed.",
      );
    });
  });

  describe("modulo", () => {
    test("returns the remainder for whole numbers", () => {
      expect(calculate("10", "%", "3")).toBe(1);
    });

    test("supports exported modulo directly", () => {
      expect(modulo(22, 5)).toBe(2);
    });

    test("rejects modulo by zero", () => {
      expect(() => calculate("8", "%", "0")).toThrow(
        "Modulo by zero is not allowed.",
      );
    });
  });

  describe("power", () => {
    test("raises a base to an exponent", () => {
      expect(calculate("2", "^", "5")).toBe(32);
    });

    test("supports fractional powers", () => {
      expect(power(81, 0.5)).toBe(9);
    });
  });

  describe("square root", () => {
    test("calculates square root with sqrt", () => {
      expect(calculate("81", "sqrt")).toBe(9);
    });

    test("calculates square root with √", () => {
      expect(calculate("49", "√")).toBe(7);
    });

    test("supports exported squareRoot directly", () => {
      expect(squareRoot(144)).toBe(12);
    });

    test("rejects square root of a negative number", () => {
      expect(() => calculate("-9", "sqrt")).toThrow(
        "Square root of a negative number is not allowed.",
      );
    });
  });

  describe("input validation", () => {
    test("rejects unsupported operators", () => {
      expect(() => calculate("8", "invalid", "2")).toThrow(
        "Unsupported operator: invalid. Use one of +, -, x, X, *, ×, /, ÷, %, ^, sqrt, √.",
      );
    });

    test("rejects an invalid first value", () => {
      expect(() => calculate("apple", "+", "2")).toThrow(
        "The first value must be a valid number. Received: apple",
      );
    });

    test("rejects an invalid second value", () => {
      expect(() => calculate("2", "+", "pear")).toThrow(
        "The second value must be a valid number. Received: pear",
      );
    });
  });

  test("documents the supported operation types", () => {
    const supportedDescriptions = new Set(
      Object.values(OPERATIONS).map((operation) => operation.description),
    );

    expect(supportedDescriptions).toEqual(
      new Set([
        "addition",
        "subtraction",
        "multiplication",
        "division",
        "modulo",
        "power",
        "square root",
      ]),
    );
  });
});

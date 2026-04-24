const { calculate, squareRoot, OPERATIONS, UNARY_OPERATIONS } = require("../calculator");

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
    test("returns the remainder of a division", () => {
      expect(calculate("10", "%", "3")).toBe(1);
    });

    test("returns zero when evenly divisible", () => {
      expect(calculate("9", "%", "3")).toBe(0);
    });

    test("works with larger dividend", () => {
      expect(calculate("17", "%", "5")).toBe(2);
    });

    test("rejects modulo by zero", () => {
      expect(() => calculate("8", "%", "0")).toThrow(
        "Modulo by zero is not allowed.",
      );
    });
  });

  describe("power (exponentiation)", () => {
    test("raises a base to an exponent using **", () => {
      expect(calculate("2", "**", "8")).toBe(256);
    });

    test("raises a base to an exponent using ^", () => {
      expect(calculate("3", "^", "3")).toBe(27);
    });

    test("returns 1 for any base to the power of 0", () => {
      expect(calculate("7", "**", "0")).toBe(1);
    });

    test("supports fractional exponents", () => {
      expect(calculate("4", "**", "0.5")).toBe(2);
    });
  });

  describe("square root", () => {
    test("returns the square root of a perfect square", () => {
      expect(squareRoot("16")).toBe(4);
    });

    test("returns the square root of 25", () => {
      expect(squareRoot("25")).toBe(5);
    });

    test("returns the square root of 2 (irrational)", () => {
      expect(squareRoot("2")).toBeCloseTo(1.4142135623730951);
    });

    test("returns 0 for square root of 0", () => {
      expect(squareRoot("0")).toBe(0);
    });

    test("rejects square root of a negative number", () => {
      expect(() => squareRoot("-1")).toThrow(
        "Square root of a negative number is not allowed.",
      );
    });

    test("rejects non-numeric input", () => {
      expect(() => squareRoot("abc")).toThrow(
        "The value must be a valid number. Received: abc",
      );
    });
  });

  describe("input validation", () => {
    test("rejects unsupported operators", () => {
      expect(() => calculate("8", "@", "2")).toThrow(
        /Unsupported operator: @/,
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

  test("documents the supported binary operation types", () => {
    const supportedDescriptions = new Set(
      Object.values(OPERATIONS).map((operation) => operation.description),
    );

    expect(supportedDescriptions).toContain("addition");
    expect(supportedDescriptions).toContain("subtraction");
    expect(supportedDescriptions).toContain("multiplication");
    expect(supportedDescriptions).toContain("division");
    expect(supportedDescriptions).toContain("modulo");
    expect(supportedDescriptions).toContain("power");
  });

  test("documents the supported unary operation types", () => {
    const supportedDescriptions = new Set(
      Object.values(UNARY_OPERATIONS).map((operation) => operation.description),
    );

    expect(supportedDescriptions).toContain("square root");
  });
});
